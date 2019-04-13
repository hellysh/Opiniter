import urllib.request, json


def get_realtime_company_stock_api(company_code='AAPL'):

    with urllib.request.urlopen('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + company_code + '&apikey=RMFNHL4SNDCOOA6L') as url:
        data = json.loads(url.read().decode())

    return data['Global Quote']['05. price']

def get_100_days_company_stock_api(company_code='AAPL'):

    with urllib.request.urlopen('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + company_code + '&apikey=RMFNHL4SNDCOOA6L') as url:
        data = json.loads(url.read().decode())

    result = {}
    for day in data['Time Series (Daily)']:
        result[day] = float(data['Time Series (Daily)'][day]['4. close'])

    return result


if __name__ == "__main__":
    print(get_100_days_company_stock_api())
    print(get_realtime_company_stock_api())
