'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.setLanguage = setLanguage;
exports.setTranslations = setTranslations;
exports.setForceRefresh = setForceRefresh;
/*
 * Project: redux-i18n
 * File: actions.js
 */

function setLanguage(lang) {
  return { type: 'REDUX_I18N_SET_LANGUAGE', lang: lang };
}

function updateTranslations(translations) {
  return { type: 'REDUX_I18N_SET_TRANSLATIONS', translations: translations };
}

function setTranslations(translations, language) {
  return function (dispatch, getState) {
    if (language === undefined) {
      dispatch(updateTranslations(translations));
    } else {
      var state = getState();
      var trans = null;

      // Compatibility with immutable
      if (state.i18nState === undefined) {
        trans = state.getIn(['i18nState', 'translations']);
      } else {
        trans = _extends({}, state.i18nState.translations);
      }
      trans[language] = translations;
      dispatch(updateTranslations(trans));
      dispatch(setForceRefresh(true));
    }
  };
}

function setForceRefresh(force) {
  return { type: 'REDUX_I18N_SET_FORCE_REFRESH', force: force };
}