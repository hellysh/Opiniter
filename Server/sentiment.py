from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types


def print_result(annotations):
    score = annotations.document_sentiment.score
    magnitude = annotations.document_sentiment.magnitude

    for index, sentence in enumerate(annotations.sentences):
        sentence_sentiment = sentence.sentiment.score
        print('Sentence {} has a sentiment score of {}'.format(
            index, sentence_sentiment))

    print('Overall Sentiment: score of {} with magnitude of {}'.format(
        score, magnitude))
    return 0


# converts a score + magnitude to a normalized score in the range [0,4]
def get_sentiment(score, magnitude):
    if magnitude > 10:
        magnitude = 10  # cap magnitude at a certain value

    # normalize score from [0,1] to [-0.5, 0.5]
    score -= 0.5

    # we calculate the sentiment by simply multiplying the two values together
    val = score * magnitude
    return (val + 5) * (2/5)


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

    print_result(analyze("I love the taste of McDonalds!"))
