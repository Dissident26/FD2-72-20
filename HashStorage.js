function HashStorage (key, value) {
    let storage = {};
    storage[key] = value;  
    
      HashStorage.prototype.addValue = function (key, value){
          storage[key] = value
              return this
      }
      HashStorage.prototype.getValue = function (key){
          return storage[key];
      }
      HashStorage.prototype.deleteValue = function (key){
          delete storage[key];
      }
      HashStorage.prototype.getKeys = function () {
          return Object.keys(storage)
      }
  } 