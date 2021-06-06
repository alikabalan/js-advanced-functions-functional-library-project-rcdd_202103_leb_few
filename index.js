const fi = (function() {
    return {
      libraryMethod: function() {
        return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
      },

      each: function(collection, iterate) {
        const newCollection = (collection instanceof Array) ? collection.slice() : Object.values(collection)

        for (let i = 0; i < newCollection.length; i++)
          iterate(newCollection[i])

        return collection
      },

      map: function(collection, iterate) {
        if (!(collection instanceof Array))
          collection = Object.values(collection)

        const newArr = []

        for (let i = 0; i < collection.length; i++)
          newArr.push(iterate(collection[i]))

        return newArr
      },


  		reduce: function(c = [], callback = () => {}, acc) {
  			let collection = c.slice(0)

  			if (!acc) {
  				acc = collection[0]
  				collection = collection.slice(1)
  			}

  			let len = collection.length;

  			for (let i = 0; i < len; i++) {
  				acc = callback(acc, collection[i], collection)
  			}
  			return acc;
  		},

      find: function(collection, predicate) {
        if (!(collection instanceof Array))
          collection = Object.values(collection)

        for (let i = 0; i < collection.length; i++)
          if (predicate(collection[i])) return collection[i]

        return undefined
      },

      filter: function(collection, predicate) {
        if (!(collection instanceof Array))
          collection = Object.values(collection)

        const newArr = []

        for (let i = 0; i < collection.length; i++)
          if (predicate(collection[i])) newArr.push(collection[i])

        return newArr
      },

      size: function(collection) {
        return (collection instanceof Array) ? collection.length : Object.keys(collection).length
      },

      first: function(collection, stop=false) {
        return (stop) ? collection.slice(0, stop) : collection[0]
      },

      last: function(collection, start=false) {
        return (start) ? collection.slice(collection.length-start, collection.length) : collection[collection.length-1]
      },

      compact: function(collection) {
        const badBad = new Set([false, null, 0, "", undefined, NaN])
        return collection.filter(el => !badBad.has(el))
      },

      sortBy: function(collection, callback) {
        const newArr = [...collection]
        return newArr.sort(function(a, b) {
          return callback(a) - callback(b)
        })
      },

      unpack: function(receiver, arr) {
        for (let val of arr)
          receiver.push(val)
      },

      flatten: function(collection, shallow, newArr=[]) {
        if (!Array.isArray(collection)) return newArr.push(collection)
        if (shallow) {
          for (let val of collection)
            Array.isArray(val) ? this.unpack(newArr, val) : newArr.push(val)
        } else {
          for (let val of collection) {
            this.flatten(val, false, newArr)
          }
        }
        return newArr
      },

      uniqSorted: function(collection, iterate) {
        const sorted = [collection[0]]
        for (let i = 1; i < collection.length; i++) {
          if (sorted[idx-1] !== collection[i])
            sorted.push(collection[i])
        }
        return sorted
      },

      uniq: function(collection, sorted=false, iterate=false) {
        if (sorted) {
          return fi.uniqSorted(collection, iterate)
        } else if (!iterate) {
          return Array.from(new Set(collection))
        } else {
          const modifiedVals = new Set()
          const uniqVals = new Set()
          for (let val of collection) {
            const moddedVal = iterate(val)
            if (!modifiedVals.has(moddedVal)) {
              modifiedVals.add(moddedVal)
              uniqVals.add(val)
            }
          }
          return Array.from(uniqVals)
        }
      },

      keys: function(obj) {
        const keys = []
        for (let key in obj){
          keys.push(key)
        }
        return keys
      },

      values: function(obj) {
        const values = []
        for (let key in obj){
          values.push(obj[key])
        }
        return values
      },

      functions: function(obj) {
        const functionNames = []

        for (let key in obj) {
          if (typeof obj[key] === "function"){
            functionNames.push(key)
          }
        }

        return functionNames.sort()
      },

    }
  })()

  fi.libraryMethod()
