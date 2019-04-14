from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types

import requests
from requests_oauthlib import OAuth1

import re

from datetime import datetime
from pytz import timezone

import time

def init_twitter():
    API_KEY = "BBO3tycDktTQ51cqndzjPwCAl"
    API_SECRET = "IWiHqv6zPqPsRRKxPHqSuO8PhVOxaoq8c93jkMBz9vYNH0JEbb"
    ACCESS_TOKEN = "1058588036487757825-xxEE0y8rUu3K5U7FeDP3dOTBAQB68K"
    ACCESS_TOKEN_SECRET = "Cg7kLAGROGbIq9J57b0VSp9AjjDP2NfJ6Cxxxn1FEB2Jr"

    url = 'https://api.twitter.com/1.1/account/verify_credentials.json'
    auth = OAuth1(API_KEY, API_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
    auth_req = requests.get(url, auth=auth)
    return auth


# returns [(string, fav_count, retweet_count, timestamp), (), ...]
def twittertest(auth, query="Apple"):
    # https://stackoverflow.com/questions/33308634/how-to-perform-oauth-when-doing-twitter-scraping-with-python-requests
    # https://github.com/requests/requests-oauthlib

    r = requests.get('https://api.twitter.com/1.1/search/tweets.json?q={}&result_type=recent&tweet_mode=extended&lang=en&count=50'.format(query), auth=auth)

    js = r.json()

    result = []

    for stuff in js['statuses']:
        # get rid of the https
        clean_string = re.sub(r'http(.*)', ' ', stuff['full_text'])

        # get rid of emojis
        clean_string = clean_string.encode('ascii', 'ignore').decode('ascii')

        timestamp = datetime.strptime(stuff['created_at'], '%a %b %d %H:%M:%S %z %Y')

        if not clean_string.startswith("RT"):
            result.append((clean_string,
                           stuff['favorite_count'],
                           stuff['retweet_count'],
                           timestamp))

    return result


# converts from one timezone to another timezone (default = Seattle, US west coast)
def change_timezone(timestamp, dest_timezone="US/Pacific"):
    return timestamp.astimezone(timezone(dest_timezone))


def print_result(annotations):
    score = annotations.document_sentiment.score
    magnitude = annotations.document_sentiment.magnitude

    for index, sentence in enumerate(annotations.sentences):
        sentence_sentiment = sentence.sentiment.score
        #print('Sentence {} has a sentiment score of {}'.format(index, sentence_sentiment))

    #print('Overall Sentiment: score of {} with magnitude of {}'.format(score, magnitude))

    #print("sentiment score = ", get_sentiment(annotations))
    return 0


# converts the score of an annotation to the range [0,n]
def get_sentiment(annotations, likes, rt, n=4):
    score = annotations.document_sentiment.score
    # magnitude = annotations.document_sentiment.magnitude

    if score < -1.0 or score > 1.0:
        print("score out of range! score = ", str(score))

    # weight = likes + rt
    # if weight > 100:
    #     weight = 100
    # elif weight <= 0:
    #     weight = 1
    #
    # score *= weight
    #
    # # we assume score takes values from [-1, 1]
    # return (score + 100) * n/200
    return (score + 1) * n/2


# analyzes a single tweet and returns a sentiment annotation
def analyze(client, tweet_text):
    document = types.Document(
        content=tweet_text,
        type=enums.Document.Type.PLAIN_TEXT)
    annotations = client.analyze_sentiment(document=document)

    return annotations


# returns an average sentiment from the given tweets
def get_avg_sentiment(client, tweets):
    num_tweets = len(tweets)
    total_sentiment = 0

    for tweet in tweets:
        #print(tweet[0])
        annotations = analyze(client, tweet[0])
        curr_sentiment = get_sentiment(annotations, tweet[1], tweet[2])
        #print("sentiment of", curr_sentiment, "\n")
        total_sentiment += curr_sentiment

    return total_sentiment / num_tweets


if __name__ == '__main__':
    # initialize the Google Language Client
    client = language.LanguageServiceClient()
    auth = init_twitter()

    # print_result(analyze("I love SpaceX rockets!"))
    #while True:
    tweets = twittertest(auth)
    print(tweets[0][3])
    print("average sentiment = ", get_avg_sentiment(tweets))
    print()
        #time.sleep(10)