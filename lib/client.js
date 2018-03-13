'use strict';

const _ = require('lodash');
const apiList = require('../data/api-list.json');
const requestPromise = require('request-promise');
const utils = require('./helpers/utils');

class Client {
  /**
   * Configure the client
   * @param {Object} config - Config object
   * @param {String} config.host - Url of the api
   * @param {String} config.wstoken - token for request
   */
  constructor(config) {
    this._host = config.host;
    this._wstoken = config.wstoken;
  }

  /**
   * Set method and endpoint to instance
   * @param {string} method
   * @param {string} url
   * @return {Object<Client>}
   * @memberof Client
   */
  _setMethodAndEndpoint(method, url) {
    this._method = method;
    this._url = url;
    return this;
  }

  /**
   * @param {string} url
   * @returns {Object<Client}
   * @memberof Client
   */
  _get(url) {
    return this._setMethodAndEndpoint('GET', url);
  }

  /**
   * Send the actual request with set method, url and payload
   * @return {Promise}
   * @memberof Client
   */
  _end() {

    const requestOptions = {
      url: this._url,
      method: this._method,
      json: true,
      body: this._payload,
      resolveWithFullResponse: false
    };

    return requestPromise(requestOptions);
  }

  /**
   * Sets url to request
   * @memberof Client
   */
  _getUrl(endpoint, params={}, query) {
    const urlTemplate = this._host + apiList[endpoint].endpoint;
    const wsFunction = apiList[endpoint].wsfunction;

    let queryParams = {
      wstoken: this._wstoken,
      wsfunction: wsFunction,
      moodlewsrestformat: 'json'
    };

    queryParams = _.merge(queryParams, query);
    const url = utils.buildUrl(urlTemplate, params, queryParams);
    return url;
  }

  /**
   * Returns Ltis data by Course
   * @param {Object} options
   * @param {String} options.courseId - courseId of to get details for
   * @returns {Promise}
   */
  getLtisByCourse(options) {
    const query = {
      'courseids[0]': options.courseId
    };
    let url = this._getUrl('getLtisByCourse', {}, query);

    return this
      ._get(url)
      ._end();
  }



}

module.exports = Client;
