const { application } = require("express")
const mongoose=require('mongoose')

const swaggerOptions={
    swaggerDefinition:{
        openapi:'3.0.0',
          info:{
         title:'Webelight Project',
         version:'1.0.0',
         description:'These is the Backend of FMCG commercial aap where CRUD APIs are made with express and documented with swagger'
    },
    servers:[
        {
            url:"http://localhost:3000",
            description:'Development server'
        }
    ],
    components:{
        schemas:{
            user:{
                 type:Object,
                 require:['fname','lname', 'phone','email','password'],
                 properties:{
                    fname:{
                        type:'String',
                        description:'The first name of the user'
                    },
                    lname:{
                        type:'String',
                        description:'The last name of the user'
                    },
                    phone:{
                        type:'Number',
                        description:'contact number of the user'
                    },
                    email:{
                        type:'String',
                        description:'mail id of the user'
                    },
                    password:{
                        type:'String',
                        description:'password of the user'
                    }
                 },
                 example:{
                    fname:'Ankit',
                    lname:'Kumar',
                    phone:5656578783,
                    email:'abc@gmail.com',
                    password:'as12@gmail.com'
                 }
        },

        admin:{
            type:Object,
            required:[ 'fname', 'lname', 'phone','email','password'],
             properties:{
                fname:{
                        type:'String',
                        description:'The first name of the admin'
                    },
                    lname:{
                        type:'String',
                        description:'The last name of the admin'
                    },
                    designation:{
                       type:'String',
                       default:'admin',
                       description:'This is by default designation of an admin'
                    },
                    phone:{
                        type:'Number',
                        description:'contact number of the admin'
                    },
                    email:{
                        type:'String',
                        description:'mail id of the admin'
                    },
                    password:{
                        type:'String',
                        description:'password of the admin'
                    }
                 },
                 example:
                 {
                    fname:'Rahul',
                    lname:'Singh',
                    designation:'admin',
                    phone:5757667672,
                    email:'rag@gmail.com',
                    password:'raf123@'
                 }
                }  ,
                product:{
                  type:Object,
                  required:['name','description','category', 'price'],
                  properties:{
                   
                    name:{
                        type:'String',
                        description:'This is the name of the product'
                    },
                     description:{
                        type:'String',
                        description:'This is the product description'
                    },
                     category:{
                       type:'String',
                       enum:['Handloom','Bakery','Footware','Dairy'],
                       description:'The category should be under these 4 types'
                    },
                    price:{
                        type:Number,
                        description:'This is the price of the product'
                    },
                  },
                    example:{
                      name:'New AllenSolly mensJacket',
                      description:'Best Jacket in market',
                      category:'Handloom',
                      price:500
                    }
                 
                

                }  
          },
 },
 tags:[
    {
    name:'user', 
    description:'user routes'
    },
{
    name:'admin',
    description:'admin routes'
},
{
    name:'product',
    description:'product routes'
}
],
 paths:{
    "/createuser":{
        post:{
            tags:["user"],
            description:'create new user',
            requestBody: {
                content: {
                  // content-type
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/user", 
                    },
                  },
                },
              },
       
        responses:{
            201:{ description:"new user created successfully",contents:{'application/json':{}}},
            400:{description:'BAD request',contents:{"application/json":{}}},
        },
        
        
             },
             
           },
           '/loginuser':{
            post:{
                tags:['user'],
                description:'new user can login',
                requestBody: {
                    content: {
                      // content-type
                      "application/json": {
                       
                        schema:{
                          type:Object,
                          properties:{
                            required:['email','password'],
                             email:{
                              type:'string'
                             },
                             password:{
                              type:'string'
                             }
                          },
                          example:{
                            email:'abc@gmail.com',
                            password:'axc@123'
                          }
                        }
                       
                      },
                
                     
                    },
                  },


                responses:{
                    200:{ description:"user logged in  successfully",contents:{'application/json':{}}},
                    400:{description:'BAD request',contents:{"application/json":{}}},
                    401:{description:'user not authenticated',contents:{"application/json":{}}},
                },
            }

           },
           '/getusers/:adminId':{
            get:{
                tags:['user'],
                description:'get list of all users',
                responses:{
                    200:{ description:"Ok",contents:{'application/json':{}}},
                     400:{description:'Bad request',contents:{"application/json":{}}},
                     401:{description:'not authenticated',contents:{"application/json":{}}},
                     403:{description:'not authorized',contents:{"application/json":{}}},
                     404:{description:'not found',contents:{"application/json":{}}},
                },
            }
            },
            'getuser/:userId/:adminId':{
                get:{
                    tags:['user'],
                    description:'new user can login',



                    responses:{
                        200:{ description:"Ok",contents:{'application/json':{}}},
                         400:{description:'Bad request',contents:{"application/json":{}}},
                         401:{description:'not authenticated',contents:{"application/json":{}}},
                         403:{description:'not authorized',contents:{"application/json":{}}},
                         404:{description:'not found',contents:{"application/json":{}}},
                    },
                }
            },
           '/createadmin':{
             post:{
                tags:['admin'],
                description:'creation of a new admin',
                requestBody: {
                    content: {
                      // content-type
                      "application/json": {
                        schema: {
                          $ref: "#/components/schemas/admin", 
                        },
                      },
                    },
                  },
                responses:{
                    201:{ description:"new user created successfully",contents:{'application/json':{}}},
                    400:{description:'BAD request',contents:{"application/json":{}}},
                },
             }

           },
           '/loginadmin':{
            post:{
                tags:['admin'],
                description:'admin credentials for login',
                requestBody: {
                  content: {
                    // content-type
                    "application/json": {
                     
                      schema:{
                        type:Object,
                        properties:{
                          required:['email','password'],
                           email:{
                            type:'string'
                           },
                           password:{
                            type:'string'
                           }
                        },
                        example:{
                          email:'bbc@gmail.com',
                          password:'aac@123'
                        }
                      }
                     
                    },
              
                   
                  },
                },
                 

                responses:{
                    200:{ description:"admin logged in  successfully",contents:{'application/json':{}}},
                    400:{description:'BAD request',contents:{"application/json":{}}},
                    401:{description:'admin not authenticated',contents:{"application/json":{}}},
                },
             }
           },
           '/createproduct/{adminId}':{
            post:{
                tags:['product'],
                description:'creation of a new product by admin',
                operationId:'createProduct',
               
                parameters:[
                  {
                    name: "adminId", 
                    in: "path",
                    schema:{
                      type:"string",
                      required:true
                    }
                  }
                ],
                requestBody: {
                    content: {
                      // content-type
                      "application/json": {
                        schema: {
                            $ref: "#/components/schemas/product", 
                          },
                      },
                    },
                  },
                
                responses:{
                    201:{ description:"new product created successfully",contents:{'application/json':{}}},
                    400:{description:'BAD request',contents:{"application/json":{}}},
                    401:{description:'not authenticated',contents:{"application/json":{}}},
                     403:{description:'not authorized',contents:{"application/json":{}}},
                     404:{description:'not found',contents:{"application/json":{}}},
                },

             }
           },
           '/product/{productId}':{
            get:{
                tags:['product'],
                description:'get a product by its ID',
                operationId:'getproduct',
                parameters: [
                    
                    {
                      name: "productId", 
                      in: "path", 
                      schema: {
                       // $ref: "#/components/schemas/product", // data model of the param

                        type:"string",
                        
                        required: true, 
                       
                      },
                      
                      description: "The Id  of the product to retrieve", 
                    },
                  ],

                responses:{
                200:{ description:"Ok",contents:{'application/json':{}}},
                404:{ description:"not found",contents:{'application/json':{}}},
                }

            }
           },
           '/getproducts':{
            get:{
                tags:['product'],
                description:'get the list of products',

                responses:{
                200:{ description:"Ok",contents:{'application/json':{}}},
                404:{ description:"not found",contents:{'application/json':{}}},
                }
            }
           },
           '/updateproduct/{productId}/{adminId}':{
            put:{
                tags:['product'],
                description:'update the particular product',
                operationId:'updateproduct',
                parameters:[
                            // expected parameters
                    {
                      name: "id", // name of param
                      in: "path", // location of param
                      schema: {
                        $ref: "#/components/schemas/product", // id model
                      },
                      required: true, // mandatory
                      description: "updating a product from database", // param desc
                    },
                ],
                responses:{
                    200:{ description:"Ok",contents:{'application/json':{}}},
                    400:{description:'BAD request',contents:{"application/json":{}}},
                    401:{description:'not authenticated',contents:{"application/json":{}}},
                     403:{description:'not authorized',contents:{"application/json":{}}},
                     404:{description:'not found',contents:{"application/json":{}}},

                }

            }
           },
           '/deleteproduct/:productId/:adminId':{
            delete:{
                tags:['product'],
                description:'delete the product by its id',
                parameters: [
                    // expected parameters
                    {
                      name: "id", // name of param
                      in: "path", // location of param
                      schema: {
                        $ref: "#/components/schemas/product", // id model
                      },
                      required: true, // mandatory
                      description: "Deleting a product from database", // param desc
                    },
                  ],
                responses:{
                    200:{ description:"Ok",contents:{'application/json':{}}},
                    401:{description:'not authenticated',contents:{"application/json":{}}},
                     403:{description:'not authorized',contents:{"application/json":{}}},
                     404:{description:'not found',contents:{"application/json":{}}},

                }
            }
           }
    
        }

    },
    



    apis:['./route.js']



}


module.exports=swaggerOptions