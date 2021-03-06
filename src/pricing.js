/* jshint esversion: 6 */

"use strict";

var Definition = require('./base').Definition;
var Property = require('./base').Property;
var Field = require('./base').Field;

var order = require('./order');



const Price_Properties = [
    new Property(
        'type',
        "Type",
        "The string \"PRICE\". Used to identify the a Price object when found in a stream.",
        'primitive',
        'string'
    ),
    new Property(
        'instrument',
        "Instrument",
        "The Price's Instrument.",
        'primitive',
        'primitives.InstrumentName'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Price was created",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'status',
        "Status",
        "The status of the Price.",
        'primitive',
        'pricing.PriceStatus'
    ),
    new Property(
        'tradeable',
        "Is Tradeable",
        "Flag indicating if the Price is tradeable or not",
        'primitive',
        'boolean'
    ),
    new Property(
        'bids',
        "Bids",
        "The list of prices and liquidity available on the Instrument's bid side. It is possible for this list to be empty if there is no bid liquidity currently available for the Instrument in the Account.",
        'array_object',
        'PriceBucket'
    ),
    new Property(
        'asks',
        "Asks",
        "The list of prices and liquidity available on the Instrument's ask side. It is possible for this list to be empty if there is no ask liquidity currently available for the Instrument in the Account.",
        'array_object',
        'PriceBucket'
    ),
    new Property(
        'closeoutBid',
        "Closeout Bid",
        "The closeout bid Price. This Price is used when a bid is required to closeout a Position (margin closeout or manual) yet there is no bid liquidity. The closeout bid is never used to open a new position.",
        'primitive',
        'pricing.PriceValue'
    ),
    new Property(
        'closeoutAsk',
        "Closeout Ask",
        "The closeout ask Price. This Price is used when a ask is required to closeout a Position (margin closeout or manual) yet there is no ask liquidity. The closeout ask is never used to open a new position.",
        'primitive',
        'pricing.PriceValue'
    ),
    new Property(
        'quoteHomeConversionFactors',
        "Quote Home Conversions",
        "The factors used to convert quantities of this price's Instrument's quote currency into a quantity of the Account's home currency.",
        'object',
        'pricing.QuoteHomeConversionFactors'
    ),
    new Property(
        'unitsAvailable',
        "Units Available",
        "Representation of how many units of an Instrument are available to be traded by an Order depending on its postionFill option.",
        'object',
        'order.UnitsAvailable'
    ),
];

class Price extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = Price_Properties;

        data = data || {};

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "PRICE";
        }

        if (data['instrument'] !== undefined) {
            this.instrument = data['instrument'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['status'] !== undefined) {
            this.status = data['status'];
        }

        if (data['tradeable'] !== undefined) {
            this.tradeable = data['tradeable'];
        }

        if (data['bids'] !== undefined) {
            this.bids = data['bids'].map(x => new PriceBucket(x));
        }

        if (data['asks'] !== undefined) {
            this.asks = data['asks'].map(x => new PriceBucket(x));
        }

        if (data['closeoutBid'] !== undefined) {
            this.closeoutBid = data['closeoutBid'];
        }

        if (data['closeoutAsk'] !== undefined) {
            this.closeoutAsk = data['closeoutAsk'];
        }

        if (data['quoteHomeConversionFactors'] !== undefined) {
            this.quoteHomeConversionFactors = new QuoteHomeConversionFactors(data['quoteHomeConversionFactors']);
        }

        if (data['unitsAvailable'] !== undefined) {
            this.unitsAvailable = new order.UnitsAvailable(data['unitsAvailable']);
        }

    }
}

const PriceBucket_Properties = [
    new Property(
        'price',
        "Price",
        "The Price offered by the PriceBucket",
        'primitive',
        'pricing.PriceValue'
    ),
    new Property(
        'liquidity',
        "Liquidity",
        "The amount of liquidity offered by the PriceBucket",
        'primitive',
        'integer'
    ),
];

class PriceBucket extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = PriceBucket_Properties;

        data = data || {};

        if (data['price'] !== undefined) {
            this.price = data['price'];
        }

        if (data['liquidity'] !== undefined) {
            this.liquidity = data['liquidity'];
        }

    }
}

const QuoteHomeConversionFactors_Properties = [
    new Property(
        'positiveUnits',
        "Positive Units",
        "The factor used to convert a positive amount of the Price's Instrument's quote currency into a positive amount of the Account's home currency.  Conversion is performed by multiplying the quote units by the conversion factor.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'negativeUnits',
        "Negative Units",
        "The factor used to convert a negative amount of the Price's Instrument's quote currency into a negative amount of the Account's home currency.  Conversion is performed by multiplying the quote units by the conversion factor.",
        'primitive',
        'primitives.DecimalNumber'
    ),
];

class QuoteHomeConversionFactors extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = QuoteHomeConversionFactors_Properties;

        data = data || {};

        if (data['positiveUnits'] !== undefined) {
            this.positiveUnits = data['positiveUnits'];
        }

        if (data['negativeUnits'] !== undefined) {
            this.negativeUnits = data['negativeUnits'];
        }

    }
}

const ClientPrice_Properties = [
    new Property(
        'bids',
        "Bids",
        "The list of prices and liquidity available on the Instrument's bid side. It is possible for this list to be empty if there is no bid liquidity currently available for the Instrument in the Account.",
        'array_object',
        'PriceBucket'
    ),
    new Property(
        'asks',
        "Asks",
        "The list of prices and liquidity available on the Instrument's ask side. It is possible for this list to be empty if there is no ask liquidity currently available for the Instrument in the Account.",
        'array_object',
        'PriceBucket'
    ),
    new Property(
        'closeoutBid',
        "Closeout Bid",
        "The closeout bid Price. This Price is used when a bid is required to closeout a Position (margin closeout or manual) yet there is no bid liquidity. The closeout bid is never used to open a new position.",
        'primitive',
        'pricing.PriceValue'
    ),
    new Property(
        'closeoutAsk',
        "Closeout Ask",
        "The closeout ask Price. This Price is used when a ask is required to closeout a Position (margin closeout or manual) yet there is no ask liquidity. The closeout ask is never used to open a new position.",
        'primitive',
        'pricing.PriceValue'
    ),
    new Property(
        'timestamp',
        "Timestamp",
        "The date/time when the Price was created.",
        'primitive',
        'primitives.DateTime'
    ),
];

class ClientPrice extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = ClientPrice_Properties;

        data = data || {};

        if (data['bids'] !== undefined) {
            this.bids = data['bids'].map(x => new PriceBucket(x));
        }

        if (data['asks'] !== undefined) {
            this.asks = data['asks'].map(x => new PriceBucket(x));
        }

        if (data['closeoutBid'] !== undefined) {
            this.closeoutBid = data['closeoutBid'];
        }

        if (data['closeoutAsk'] !== undefined) {
            this.closeoutAsk = data['closeoutAsk'];
        }

        if (data['timestamp'] !== undefined) {
            this.timestamp = data['timestamp'];
        }

    }
}

const PricingHeartbeat_Properties = [
    new Property(
        'type',
        "Type",
        "The string \"HEARTBEAT\"",
        'primitive',
        'string'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Heartbeat was created.",
        'primitive',
        'primitives.DateTime'
    ),
];

class PricingHeartbeat extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Pricing Heartbeat {time}";

        this._nameFormat = "";

        this._properties = PricingHeartbeat_Properties;

        data = data || {};

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "HEARTBEAT";
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

    }
}

class EntitySpec {
    constructor(context) {
        this.context = context;
        this.Price = Price;
        this.PriceBucket = PriceBucket;
        this.QuoteHomeConversionFactors = QuoteHomeConversionFactors;
        this.ClientPrice = ClientPrice;
        this.PricingHeartbeat = PricingHeartbeat;
    }

    get(
        accountID,
        queryParams,
        responseHandler
    )
    {
        if (!responseHandler)
        {
            throw "No responseHandler provided for API call"
        }


        let path = '/v3/accounts/{accountID}/pricing';

        queryParams = queryParams || {};

        path = path.replace('{' + 'accountID' + '}', accountID);

        path = path + "?";
        if (typeof queryParams['instruments'] !== 'undefined') {
            path = path + "instruments=" + queryParams['instruments'] + "&";
        }
        if (typeof queryParams['since'] !== 'undefined') {
            path = path + "since=" + queryParams['since'] + "&";
        }
        if (typeof queryParams['includeUnitsAvailable'] !== 'undefined') {
            path = path + "includeUnitsAvailable=" + queryParams['includeUnitsAvailable'] + "&";
        }

        let body = {};

        let handleResponse = (response) => {
            if (response.contentType.startsWith("application/json"))
            {
                let msg = JSON.parse(response.rawBody);

                response.body = {};

                if (response.statusCode == 200)
                {
                    if (msg['prices'] !== undefined) {
                        response.body.prices = msg['prices'].map(x => new Price(x));
                    }

                }
                else if (response.statusCode == 400)
                {
                }
                else if (response.statusCode == 401)
                {
                }
                else if (response.statusCode == 404)
                {
                }
                else if (response.statusCode == 405)
                {
                }
                //
                // Assume standard error response with errorCode and errorMessage
                //
                else
                {
                    if (msg['errorCode'] !== undefined) {
                        response.body.errorCode = msg['errorCode'];
                    }

                    if (msg['errorMessage'] !== undefined) {
                        response.body.errorMessage = msg['errorMessage'];
                    }
                }
            }

            responseHandler(response);
        };


        this.context.request(
            'GET',
            path,
            body,
            undefined,
            handleResponse
        );
    }

    stream(
        accountID,
        queryParams,
        streamChunkHandler,
        responseHandler
    )
    {
        if (!responseHandler)
        {
            throw "No responseHandler provided for API call"
        }

        if (!streamChunkHandler)
        {
            throw "No streamChunkHandler provided for streaming API call"
        }

        let path = '/v3/accounts/{accountID}/pricing/stream';

        queryParams = queryParams || {};

        path = path.replace('{' + 'accountID' + '}', accountID);

        path = path + "?";
        if (typeof queryParams['instruments'] !== 'undefined') {
            path = path + "instruments=" + queryParams['instruments'] + "&";
        }
        if (typeof queryParams['snapshot'] !== 'undefined') {
            path = path + "snapshot=" + queryParams['snapshot'] + "&";
        }

        let body = {};

        let handleResponse = (response) => {
            if (response.contentType.startsWith("application/json"))
            {
                let msg = JSON.parse(response.rawBody);

                response.body = {};

                if (response.statusCode == 200)
                {
                    if (msg['price'] !== undefined) {
                        response.body.price = new Price(msg['price']);
                    }

                    if (msg['heartbeat'] !== undefined) {
                        response.body.heartbeat = new PricingHeartbeat(msg['heartbeat']);
                    }

                }
                else if (response.statusCode == 400)
                {
                }
                else if (response.statusCode == 401)
                {
                }
                else if (response.statusCode == 404)
                {
                }
                else if (response.statusCode == 405)
                {
                }
                //
                // Assume standard error response with errorCode and errorMessage
                //
                else
                {
                    if (msg['errorCode'] !== undefined) {
                        response.body.errorCode = msg['errorCode'];
                    }

                    if (msg['errorMessage'] !== undefined) {
                        response.body.errorMessage = msg['errorMessage'];
                    }
                }
            }

            responseHandler(response);
        };

        function generateStreamParser(streamChunkHandler)
        {
            return (chunk) => {
                let msg = JSON.parse(chunk);

                if (msg.type == "HEARTBEAT")
                {
                    streamChunkHandler(new PricingHeartbeat(msg));
                }
                else if (msg.type == "PRICE")
                {
                    streamChunkHandler(new Price(msg));
                }
            }
        }

        this.context.request(
            'GET',
            path,
            body,
            generateStreamParser(streamChunkHandler),
            handleResponse
        );
    }



}

exports.Price = Price;
exports.PriceBucket = PriceBucket;
exports.QuoteHomeConversionFactors = QuoteHomeConversionFactors;
exports.ClientPrice = ClientPrice;
exports.PricingHeartbeat = PricingHeartbeat;

exports.EntitySpec = EntitySpec;
