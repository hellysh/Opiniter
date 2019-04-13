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
    print(dir(annotations.language))
    return 0


# converts the score of an annotation to the range [0,100]
def get_sentiment(annotations):
    score = annotations.document_sentiment.score
    # magnitude = annotations.document_sentiment.magnitude

    if score < -1.0 or score > 1.0:
        print("score out of range! score = ", str(score))

    # we assume score takes values from [-1, 1]
    return (score + 1) * 50


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

    print_result(analyze("I love SpaceX rockets!"))
