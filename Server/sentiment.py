from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types

import requests
from requests_oauthlib import OAuth1

import re

from datetime import datetime
from pytz import timezone


# returns [(string, fav_count, retweet_count, timestamp), (), ...]
def twittertest():
    # https://stackoverflow.com/questions/33308634/how-to-perform-oauth-when-doing-twitter-scraping-with-python-requests
    # https://github.com/requests/requests-oauthlib

    API_KEY = "BBO3tycDktTQ51cqndzjPwCAl"
    API_SECRET = "IWiHqv6zPqPsRRKxPHqSuO8PhVOxaoq8c93jkMBz9vYNH0JEbb"
    ACCESS_TOKEN = "1058588036487757825-xxEE0y8rUu3K5U7FeDP3dOTBAQB68K"
    ACCESS_TOKEN_SECRET = "Cg7kLAGROGbIq9J57b0VSp9AjjDP2NfJ6Cxxxn1FEB2Jr"

    url = 'https://api.twitter.com/1.1/account/verify_credentials.json'
    auth = OAuth1(API_KEY, API_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
    auth_req = requests.get(url, auth=auth)

    r = requests.get('https://api.twitter.com/1.1/search/tweets.json?q=nasa&result_type=recent&tweet_mode=extended&lang=en', auth=auth)

    js = r.json()

    result = []

    for stuff in js['statuses']:
        # get rid of the https
        clean_string = re.sub(r'http(.*)', ' ', stuff['full_text'])

        # get rid of emojis
        clean_string = clean_string.encode('ascii', 'ignore').decode('ascii')

        timestamp = datetime.strptime(stuff['created_at'], '%a %b %d %H:%M:%S %z %Y')

        result.append((clean_string,
                       stuff['favorite_count'],
                       stuff['retweet_count'],
                       timestamp))

        print(clean_string)
        print(timestamp)
        print(change_timezone(timestamp))

        print()

    return result


# converts from one timezone to another timezone (default = Seattle, US west coast)
def change_timezone(timestamp, dest_timezone="US/Pacific"):
    return timestamp.astimezone(timezone(dest_timezone))


def print_result(annotations):
    score = annotations.document_sentiment.score
    magnitude = annotations.document_sentiment.magnitude

    for index, sentence in enumerate(annotations.sentences):
        sentence_sentiment = sentence.sentiment.score
        print('Sentence {} has a sentiment score of {}'.format(
            index, sentence_sentiment))

    print('Overall Sentiment: score of {} with magnitude of {}'.format(
        score, magnitude))

    print("sentiment score = ", get_sentiment(annotations))
    return 0


# converts the score of an annotation to the range [0,n]
def get_sentiment(annotations, n=4):
    score = annotations.document_sentiment.score
    # magnitude = annotations.document_sentiment.magnitude

    if score < -1.0 or score > 1.0:
        print("score out of range! score = ", str(score))

    # we assume score takes values from [-1, 1]
    return (score + 1) * n/2


# analyzes a single tweet and returns a sentiment annotation
def analyze(tweet):
    document = types.Document(
        content=tweet,
        type=enums.Document.Type.PLAIN_TEXT)
    annotations = client.analyze_sentiment(document=document)

    return annotations


if __name__ == '__main__':
    # initialize the Google Language Client
    client = language.LanguageServiceClient()

    #print_result(analyze("I love SpaceX rockets!"))
    twittertest()
