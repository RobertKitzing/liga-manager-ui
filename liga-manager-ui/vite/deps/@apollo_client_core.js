import {
  ApolloClient,
  HttpLink,
  NetworkStatus,
  ObservableQuery,
  checkFetcher,
  createHttpLink,
  createSignalIfSupported,
  defaultPrinter,
  disableExperimentalFragmentVariables,
  disableFragmentWarnings,
  enableExperimentalFragmentVariables,
  fallbackHttpConfig,
  gql,
  isNetworkRequestSettled,
  parseAndCheckHttpResponse,
  resetCaches,
  rewriteURIForGET,
  selectHttpOptionsAndBody,
  selectHttpOptionsAndBodyInternal,
  selectURI,
  serializeFetchParameter
} from "./chunk-46W5MO34.js";
import {
  ApolloError,
  isApolloError
} from "./chunk-36VMQXQL.js";
import {
  ApolloCache,
  Cache,
  InMemoryCache,
  MissingFieldError,
  defaultDataIdFromObject,
  makeVar
} from "./chunk-H3ZUXSPN.js";
import {
  ApolloLink,
  concat,
  empty,
  execute,
  from,
  fromError,
  fromPromise,
  split,
  throwServerError,
  toPromise
} from "./chunk-2XKOZBXR.js";
import {
  DocumentTransform,
  Observable,
  isReference,
  makeReference,
  mergeOptions,
  setVerbosity
} from "./chunk-ZP3FOA4A.js";
import "./chunk-HM5YLMWO.js";
import "./chunk-3OV72XIM.js";
export {
  ApolloCache,
  ApolloClient,
  ApolloError,
  ApolloLink,
  Cache,
  DocumentTransform,
  HttpLink,
  InMemoryCache,
  MissingFieldError,
  NetworkStatus,
  Observable,
  ObservableQuery,
  checkFetcher,
  concat,
  createHttpLink,
  createSignalIfSupported,
  defaultDataIdFromObject,
  defaultPrinter,
  disableExperimentalFragmentVariables,
  disableFragmentWarnings,
  empty,
  enableExperimentalFragmentVariables,
  execute,
  fallbackHttpConfig,
  from,
  fromError,
  fromPromise,
  gql,
  isApolloError,
  isNetworkRequestSettled,
  isReference,
  makeReference,
  makeVar,
  mergeOptions,
  parseAndCheckHttpResponse,
  resetCaches,
  rewriteURIForGET,
  selectHttpOptionsAndBody,
  selectHttpOptionsAndBodyInternal,
  selectURI,
  serializeFetchParameter,
  setVerbosity as setLogVerbosity,
  split,
  throwServerError,
  toPromise
};
