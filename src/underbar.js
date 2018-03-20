(function() {
  'use strict';

  window._ = {};


  _.identity = function(val) {
    return val;
  };

  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  _.last = function(array, n) {
    if (n === 0) {
      return [];
    }
    return n === undefined ? array[array.length -1] : array.slice(-n);
  };

  _.each = function(collection, iterator) {
      if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
          iterator(collection[i], i, collection);
        }
      } else {
          for (var key in collection) {
            iterator(collection[key], key, collection);
          }
      }
  };

  _.indexOf = function(array, target){
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  _.filter = function(collection, test) {
      
    var result = [];

    _.each(collection, function(item) {
      if (test(item) === true) {
        result.push(item);
      }
    });

    return result;
  };

  _.reject = function(collection, test) {
    var result = [];
    
    _.each(collection, function(item) {
      if (test(item) === false) {
        result.push(item);
      }
    });

    return result;
  };

  _.uniq = function(array, isSorted, iterator) {

    var result = [];
    var iteratedItems = [];

    isSorted === true;

    if (iterator) {
      _.each(array, function(item) {
        if (iteratedItems.indexOf(iterator(item)) === -1) {
          iteratedItems.push(iterator(item));
          result.push(item);
        }
      });
    } else {
      _.each(array, function(item) {
        if (result.indexOf(item) === -1) {
          result.push(item);
        }
      });
    }
    return result;
  };

  _.map = function(collection, iterator) {
    var result = [];

    _.each(collection, function(item) {
      result.push(iterator(item));
    });
    return result;
  };

  _.pluck = function(collection, key) {
    return _.map(collection, function(item){
      return item[key];
    });
  };

  _.reduce = function(collection, iterator, accumulator) {
    
    if (accumulator === undefined) {
      accumulator = collection[0];
      collection = collection.slice(1);
    }

    _.each(collection, function(item, i) {
      accumulator = iterator(accumulator, item, i);
    });
    return accumulator;
  };

  _.contains = function(collection, target) {
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };

  _.every = function(collection, iterator) {
    if (iterator) {
      return _.reduce(collection, function(curr, next) {
        if (curr === false) {
          return false;
        }
        return Boolean(iterator(next)) === true;
      }, true);
    };

    return _.reduce(collection, function(curr, next) {
      if (curr === false) {
        return false;
      }
      return next === true;
    }, true);
  };

  _.some = function(collection, iterator) {
    if (iterator === undefined) {
      iterator = _.identity;
    }

    return Boolean(_.reduce(collection, function(curr, next) {
      return curr || iterator(next);
    }, false));
  };

  _.extend = function(obj) {
    
    _.each(arguments, function(item) {
      _.each(item, function(value, key) {
        obj[key] = value;
      });
    });
    return obj;
  };

  _.defaults = function(obj) {

    _.each(arguments, function(item) {
      _.each(item, function(value, key) {
        if (obj[key] === undefined) {
          obj[key] = value;
        }
      });
    });
    return obj;
  };

  _.once = function(func) {
    var alreadyCalled = false;
    var result;

    return function() {
      if (!alreadyCalled) {
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      return result;
    };
  };

  _.memoize = function(func) {
    
    var memo = {};

    return function() {
      var key = JSON.stringify(arguments);
      
      if (!memo.hasOwnProperty(key)) {
      memo[key] = func.apply(this, arguments);
      }
    
      return memo[key];
    }
  };

  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments, 2);
    setTimeout(function() {
      func.apply(this, args);
    }, wait);
  };

  _.shuffle = function(array) {
    var arr2 = [];

    _.each(array, function(item) {
      var randomNum = Math.floor(Math.random() * (array.length));
      arr2.splice(randomNum, 0, item);
    });
    return arr2;
  };
  
}());
