[![Maintainability](https://api.codeclimate.com/v1/badges/779d9e91f96d343514ed/maintainability)](https://codeclimate.com/github/NikitaNaumenko/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/779d9e91f96d343514ed/test_coverage)](https://codeclimate.com/github/NikitaNaumenko/frontend-project-lvl2/test_coverage)
![CI](https://github.com/NikitaNaumenko/frontend-project-lvl2/workflows/CI/badge.svg)

[![asciicast](https://asciinema.org/a/uEXdifM7lI3KRnq4c7VIA4XCg.svg)](https://asciinema.org/a/uEXdifM7lI3KRnq4c7VIA4XCg)
# genDiff

## Setup

clone and run
```sh
$ make install
```
## Usage

* program supports four input file types: `.yml` `.yaml` `.ini` `.json`
* `$ gendiff before.json after.json` get diff with default output
* `$ gendiff before.yml after.yml --format json` get full diff tree with JSON output
* `$ gendiff before.yml after.yml --format plain` get plain text describe diff
* `-f | --format [type]` formating output to stylish, plain or json, default is stylish
* `-h | --help` help page
* `-V | --version` program version

## Example

before.json
```json
{
  "common": {
    "setting1": "Value 1",
    "setting2": "200",
    "setting3": true,
    "setting6": {
      "key": "value"
    }
  },
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  },
  "group2": {
    "abc": "12345"
  }
}
```
after.json
```json
{
  "common": {
    "follow": false,
    "setting1": "Value 1",
    "setting3": {
      "key": "value"
    },
    "setting4": "blah blah",
    "setting5": {
      "key5": "value5"
    },
    "setting6": {
      "key": "value",
      "ops": "vops"
    }
  },
  "group1": {
    "foo": "bar",
    "baz": "bars",
    "nest": "str"
  },
  "group3": {
    "fee": "100500"
  }
}
```
### Stylish output
`$ genDiff before.json after.json`
```
{
    common: {
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
        setting6: {
            key: value
          + ops: vops
        }
      + follow: false
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}
```
### Plain output
`$ genDiff before.json after.json -f plain`
```
Property common.setting2 was removed
Property common.setting3 was updated. From true to [complex value]
Property common.setting6.ops was added with value 'vops'
Property common.follow was added with value false
Property common.setting4 was added with value 'blah blah'
Property common.setting5 was added with value [complex value]
Property group1.baz was updated. From 'bas' to 'bars'
Property group1.nest was updated. From [complex value] to 'str'
Property group2 was removed
Property group3 was added with value [complex value]
```

### JSON output
`$ gendiff before.json after.json -f json`
```json
[
   {
      "key":"common",
      "type":"nest",
      "children":[
         {
            "key":"setting1",
            "valueBefore":"Value 1",
            "type":"unchanged"
         },
         {
            "key":"setting2",
            "valueBefore":"200",
            "type":"deleted"
         },
         {
            "key":"setting3",
            "valueBefore":true,
            "valueAfter":{
               "key":"value"
            },
            "type":"changed"
         },
         {
            "key":"setting6",
            "type":"nest",
            "children":[
               {
                  "key":"key",
                  "valueBefore":"value",
                  "type":"unchanged"
               },
               {
                  "key":"ops",
                  "valueAfter":"vops",
                  "type":"added"
               }
            ]
         },
         {
            "key":"follow",
            "valueAfter":false,
            "type":"added"
         },
         {
            "key":"setting4",
            "valueAfter":"blah blah",
            "type":"added"
         },
         {
            "key":"setting5",
            "valueAfter":{
               "key5":"value5"
            },
            "type":"added"
         }
      ]
   },
   {
      "key":"group1",
      "type":"nest",
      "children":[
         {
            "key":"baz",
            "valueBefore":"bas",
            "valueAfter":"bars",
            "type":"changed"
         },
         {
            "key":"foo",
            "valueBefore":"bar",
            "type":"unchanged"
         },
         {
            "key":"nest",
            "valueBefore":{
               "key":"value"
            },
            "valueAfter":"str",
            "type":"changed"
         }
      ]
   },
   {
      "key":"group2",
      "valueBefore":{
         "abc":"12345"
      },
      "type":"deleted"
   },
   {
      "key":"group3",
      "valueAfter":{
         "fee":"100500"
      },
      "type":"added"
   }
]
```
