export const userConfig = {
  "apiUrl": "https://jsonplaceholder.typicode.com/users",
  "headers": [ 
    { "field": "name", "display": "Name" }, 
    { "field": "email", "display": "Email" }, 
    { "field": "address.city", "display": "City" }, 
    { "field": "company.name", "display": "Company"}
  ],
  "alignments": [ "left", "center", "right", "right" ],
  "cols": [ 3, -1, 2, 4 ],
  "title": "Users",
  "searchCaseSensitive": false
};

export default userConfig;
