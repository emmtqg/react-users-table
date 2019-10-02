export default interface TableConfigType {
  "apiUrl": string
  "headers": [ 
    { "field": string, "display": string }
  ]
  "alignments": [ string ],
  "cols": [ number ],
  "title": string,
  "searchCaseSensitive"?: boolean;
}