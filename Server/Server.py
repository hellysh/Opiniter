import flask
import CompanyStockAPI
import csv
import sentiment
from google.cloud import language

app = flask.Flask(__name__)


@app.route('/', methods=['GET'])
def get_curr_company_stock():
    company = flask.request.args.get('company', default='Apple Inc.', type=str)
    print(company, full_to_short[company])

    tweets = sentiment.twittertest(auth, company.split(' ', 1)[0])
    print('tweets = ' + company.split(' ', 1)[0])

    return flask.jsonify(
        stock=float(CompanyStockAPI.get_realtime_company_stock_api(full_to_short[company])),
        sentiment=float(sentiment.get_avg_sentiment(client, tweets))
    )

full_to_short = {}

with open('companies.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    first_line = True
    for row in csv_reader:
        if first_line is True:
            first_line = False
        else:
            full_to_short[row[1]] = row[0]

auth = sentiment.init_twitter()
client = language.LanguageServiceClient()

app.run()