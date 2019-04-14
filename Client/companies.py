def companies():
    companies = []
    with open('companies.txt') as f:
        for line in f:
            result = [x.strip() for x in line.split(',')]
            companies.append(result[0])
    print(companies)

if __name__ == '__main__':
    companies()