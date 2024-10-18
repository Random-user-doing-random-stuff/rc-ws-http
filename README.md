## Registar

```
POST /user/register
{
  "name" : string,
  "email" : string,
  "password" : string
}
```



## Login 
### Request

```
POST /user/login
{
  "email" : string,
  "password" : string,
}
  
```
### Response
```
{
  "token": string
}
```
