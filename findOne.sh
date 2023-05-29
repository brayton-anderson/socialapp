#!/bin/bash

# 1. Data API App Id
appid="data-sroyc"

# 2. API Key
apikey="29Rr7xXyO6mM18qTPYSm308j5ej24x2jt457FotXXOfBLLfPjWl2y7JaEHOefsu8"

# 3. Base URL
baseurl="https://ap-south-1.aws.data.mongodb-api.com/app/$appid/endpoint/data/v1"

# 4. Endpoint
endpoint="/action/findOne"

# 5. dataSource
dataSource="Cluster0"

# 6. database
database="social_app"

# 7. collection
collection="minerals"

# 8. filter
# filter='{}'
filter='{
  "body": {
    "$regex": "dad-a-base", 
    "$options": "i"
  } 
}'

# 9. Run the curl request from the terminal: ./findOne.sh
curl -XPOST -H "api-key: $apikey" -H 'Access-Control-Request-Headers: *' -H 'Content-type: application/json' -d '{ 
  "dataSource": "'"$dataSource"'", 
  "database": "'"$database"'", 
  "collection": "'"$collection"'",
  "filter": '"$filter"'
}' $baseurl$endpoint | npx json