import * as BaseProvider from '../BaseProvider';

export class Api extends BaseProvider.Api {
  apiName = 'Luno';

  apiDocs = [
    ['API Docs', 'https://www.luno.com/en/developers/api'],
    ['Coin and Currency List', 'https://www.luno.com/en/developers/api#tag/Currency'],
  ];

  interval = 5;

  getUrl() {
    return `https://api.luno.com/api/1/tickers`;
  }

  getLast(data, { base, quote }) {
    if (!data.tickers) {
      throw new Error('no tickers');
    }
    const result = data.tickers.find(({ pair }) => pair === (base.toUpperCase() + quote.toUpperCase()));
    if (!result) {
      throw new Error(`no quote currency ${quote.toUpperCase()}`);
    }
    return result.last_trade;
  }
}
