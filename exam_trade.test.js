var sup = require ('supertest');
var auth = require('./token');
var url = 'Enter the URL'
var name  = "CEH"
var examid;
var examTrad_id;
var extrade;


//------------------------------------------------------------------------------


const exam_payload = (
{"key": "ques",
"title": name,
"examType":"Skill Assessment Exam",
"educationType": "Engineering",
"poweredBy": "Emerge",
"duration": 33,
"examTime": "2022-09-09 20:44:00",
"role": "SUPER ADMIN",
"userId": 142,
"trade": "Game Design"})


beforeAll((async () => {
    const response = await sup(url).post('user/login')
      .send({
        "email": "ffeeee@gmail.com",
        "password": "Admin@123",
      })
      auth.token = response._body.result.token
      //console.log(response)
    expect(response.status).toBe(200)
  }))


describe("EXAM REGISTRATION",()=>{
    it("new exam",async () => {
        const response = await sup(url).post('exam/createExam')
        .send(exam_payload)
             .set('Authorization', 'bearer ' + auth.token)
             //console.log(response)
             expect(response.statusCode).toBe(200)})

    it("To Fetch the Exam_id",async () => {
        const response = await sup(url).post('exam/getAllExam')
        .set('Authorization', 'bearer ' + auth.token)
       // console.log(response);
        const exam = response._body.result.exam.filter(x => x.title == name );
        examid  = exam[0].id;
        console.log(examid)
        //console.log(exam)
    expect(response.status).toBe(200)})

   
})

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

describe("Super_Admin_Login",()=>{

      it('SUPER_ADMIN_LOGIN -fail --WRONG_URL', async () => {
        const response = await sup(url).post('user/logi')
          .send({
            "email": "ffeeee@gmail.com",
            "password": "Admin@123",
          })
          //auth.token = response._body.result.token
          if (response.statusCode == 404){
            console.log(response.res.statusCode, response.res.statusMessage);
          }
          //console.log(response)
        expect(response.status).toBe(404)
      })

      it('SUPER_ADMIN_LOGIN -fail --WRONG_EMAIL', async () => {
        const response = await sup(url).post('user/login')
          .send({
            "email": "ffeee3e@gmail.com",
            "password": "Admin@123",
          })

          if (response.statusCode == 400){
            console.log(response._body.error.errors);
          }
          //console.log(response)
        expect(response.status).toBe(400)
      })


      it('SUPER_ADMIN_LOGIN -fail --WRONG_PASSWORD', async () => {
        const response = await sup(url).post('user/login')
          .send({
            "email": "ffeeee@gmail.com",
            "password": "admin@123",
          })

          if (response.statusCode == 400){
            console.log(response._body.error.errors);
          }
          //console.log(response)
        expect(response.status).toBe(400)
     
      })

      
})


//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

describe('Create_Exam_Trade', ()=>{

    it("To Fetch the Last_Exam_Trade",async () => {
        const response = await sup(url).get('examTrade/getAllExamTrade')
        
        .set('Authorization', 'bearer ' + auth.token)
        //console.log(response._body.result.exam);
        var tradeid = response._body.result.exam.at(-1);  
        examTrad_id = tradeid.id
        console.log(examTrad_id)
        })
     

     it("CREATE_EXAM_TRADE --pass",async ()=>{
        const response = await sup(url).post('examTrade/createExamTrade')
       // console.log(response)
        .send({ "id": extrade ,
        "examId": examid,
            "tradeName": "Civil Engineering"})

    .set('Authorization', 'bearer ' + auth.token)

        expect(response.statusCode).toBe(200)

        if(response.statusCode == 200){
            console.log(response._body.result);
        }
     })

     

     it("CREATE_EXAM_TRADE -fail --WRONG_URL",async ()=>{
        const response = await sup(url).post('examTrade/createExamTrad')
       // console.log(response)
        .send({ "id": extrade ,
        "examId": examid,
            "tradeName": "Civil Engineering"})
    
    .set('Authorization', 'bearer ' + auth.token)
    
        expect(response.statusCode).toBe(404)
    
        if(response.statusCode == 404){
            console.log(response.res.statusCode,response.res.statusMessage);
             }
        })
    
     it("CREATE_EXAM_TRADE -fail --UNAUTHORIZED",async ()=>{
        const response = await sup(url).post('examTrade/createExamTrade')
       // console.log(response)
        .send({ "id": extrade ,
        "examId": examid,
            "tradeName": "Civil Engineering"})

    //.set('Authorization', 'bearer ' + auth.token)

        expect(response.statusCode).toBe(401)

        if(response.statusCode == 401){
            console.log(response.res.statusCode,response.res.statusMessage);
        }
     })


     it("CREATE_EXAM_TRADE -fail --NO_id",async ()=>{
         const response = await sup(url).post('examTrade/createExamTrade')
        // console.log(response)
        .send({  "id":"",
        "examId": examid,
            "tradeName": "Electrical Engineering"})
        .set('Authorization', 'bearer ' + auth.token)
    
        expect(response.statusCode).toBe(500)

        if(response.statusCode == 500){
            console.log(response._body.error.errors);
    } 
})

     it("CREATE_EXAM_TRADE -fail --NO_examId",async ()=>{
    const response = await sup(url).post('examTrade/createExamTrade')
   // console.log(response)
    .send({ "id":extrade,
    "examId": "",
        "tradeName": "Electrical Engineering"})

    .set('Authorization', 'bearer ' + auth.token)

    expect(response.statusCode).toBe(500)

    if(response.statusCode == 500){
        console.log(response._body.error.errors);
    } 
})

     it("CREATE_EXAM_TRADE -fail --NO_id,examId,tradeName",async ()=>{
    const response = await sup(url).post('examTrade/createExamTrade')
   // console.log(response)
    .send({"id":"",
    "examId": "",
        "tradeName": ""})

    .set('Authorization', 'bearer ' + auth.token)

    expect(response.statusCode).toBe(500)

    if(response.statusCode == 500){
        console.log(response._body.error.errors);
    } 
})
})

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

describe("Get_All_Exam_Trade", ()=>{
    it("GET_ALL_EXAM_TRADE --pass", async ()=>{
    const response = await sup(url).get('examTrade/getAllExamTrade')

    .set('Authorization', 'bearer ' + auth.token)
    //console.log(response)

    expect(response.statusCode).toBe(200)

    if (response.statusCode == 200){
        console.log(response._body.result.exam)
    }
})

    it("GET_ALL_EXAM_TRADE -fail --WRONG_URL", async ()=>{
        const response = await sup(url).get('examTrade/getAllExamTrad')
    
        .set('Authorization', 'bearer ' + auth.token)
        //console.log(response)
    
        expect(response.statusCode).toBe(404)
    
        if (response.statusCode == 404){
            console.log(response.res.statusCode,response.res.statusMessage)
        }
})
        
    it("GET_ALL_EXAM_TRADE -fail --UNAUTHORIZED", async ()=>{
            const response = await sup(url).get('examTrade/getAllExamTrade')
          //.set('Authorization', 'bearer ' + auth.token)
            //console.log(response)

            expect(response.statusCode).toBe(401)
        
            if (response.statusCode == 401){
                console.log(response.res.statusCode,response.res.statusMessage)
         }
    })
})

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

describe('Get_All_Exam_Trade_By_ID', () =>{
    it('GET_ALL_EXAM_TRADE_BY_ID --pass', async ()=> {
        const response = await sup(url).get('examTrade/getById/'+examTrad_id)
        
        .set('Authorization', 'bearer ' + auth.token)
        //console.log(response)
    
        expect(response.statusCode).toBe(200)

        if (response.statusCode == 200){
            console.log(response._body.result);
        }
    })

    it('GET_ALL_EXAM_TRADE_BY_ID -fail --WRONG_URL', async ()=> {
        const response = await sup(url).get('examTrade/getById')
        
        .set('Authorization', 'bearer ' + auth.token)
        //console.log(response)
    
        expect(response.statusCode).toBe(404)

        if (response.statusCode == 404){
            console.log(response.res.statusCode,response.res.statusMessage);
        }
    })

    it("GET_ALL_EXAM_TRADE_BY_ID -fail --UNAUTHORIZED", async ()=> {
        const response = await sup(url).get('examTrade/getById/'+examTrad_id)
        
        //.set('Authorization', 'bearer ' + auth.token)
        //console.log(response)
    
        expect(response.statusCode).toBe(401)

        if (response.statusCode == 401){
            console.log(response.res.statusCode,response.res.statusMessage);
        }
    })

    it('GET_ALL_EXAM_TRADE_BY_ID -fail --NO_ID_MENTIONED', async ()=> {
        const response = await sup(url).get('examTrade/getById/')
        
        .set('Authorization', 'bearer ' + auth.token)
        //console.log(response)
    
        expect(response.statusCode).toBe(404)

        if (response.statusCode == 404){
            console.log(response.res.statusCode,response.res.statusMessage);
        }
    })

    it("GET_ALL_EXAM_TRADE_BY_ID -fail --ID_DOESN'T_EXIST", async ()=> {
        const response = await sup(url).get('examTrade/getById/1')
        
        .set('Authorization', 'bearer ' + auth.token)
        //console.log(response)

        expect(response.statusCode).toBe(400)

        if (response.statusCode == 400){
            console.log(response._body.error.errors);
        }
    })
})

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

describe('Update_Exam_Trade_By_ID', ()=> {
    it("UPDATE_EXAM_TRADE_BY_ID --pass", async ()=> {
        const response = await sup(url).put('examTrade/updateExamTrade/'+examTrad_id)
        .send({"key": "ques",
            "title": name,
            "examType": "Skill Assessment Exam",
            "educationType": "Engineering",
            "poweredBy": "Emerge",
            "duration": "33",
            "examTime": "2022-09-09 20:44:00",
            "userId": "142",
            "role": "SUPER ADMIN",
            "trade": "Game Design"})

        .set('Authorization', 'bearer ' + auth.token)

        expect(response.statusCode).toBe(200)

        if(response.statusCode == 200){
            console.log(response._body.result);
        }
    })

    it("UPDATE_EXAM_TRADE_BY_ID -fail --WRONG_URL", async ()=> {
        const response = await sup(url).put('examTrade/updateExamTrade')
        .send({"key": "ques",
        "title":name,
        "examType": "Skill Assessment Exam",
        "educationType": "Engineering",
        "poweredBy": "Emerge",
        "duration": "33",
        "examTime": "2022-09-09 20:44:00",
        "userId": "142",
        "role": "SUPER ADMIN",
        "trade": "Game Design"})
        .set('Authorization', 'bearer ' + auth.token)
        //console.log(response)
        expect(response.statusCode).toBe(404)

        if(response.statusCode == 404){
            console.log(response.res.statusCode,response.res.statusMessage);
        }
    })

    it("UPDATE_EXAM_TRADE_BY_ID -fail --UNAUTHORIZED", async ()=> {
        const response = await sup(url).put('examTrade/updateExamTrade/1')
        .send({"key": "ques",
        "title": name,
        "examType": "Skill Assessment Exam",
        "educationType": "Engineering",
        "poweredBy": "Emerge",
        "duration": "33",
        "examTime": "2022-09-09 20:44:00",
        "userId": "142",
        "role": "SUPER ADMIN",
        "trade": "Game Design"})
        //.set('Authorization', 'bearer ' + auth.token)

        expect(response.statusCode).toBe(401)

        if(response.statusCode == 401){
            console.log(response.res.statusCode,response.res.statusMessage);
        }
    })

    it("UPDATE_EXAM_TRADE_BY_ID -fail --RANDOM_HARD-CODED_TOKEN", async ()=> {
        const response = await sup(url).put('examTrade/updateExamTrade/'+examTrad_id)
        .send({"key": "ques",
        "title": name,
        "examType": "Skill Assessment Exam",
        "educationType": "Engineering",
        "poweredBy": "Emerge",
        "duration": "33",
        "examTime": "2022-09-09 20:44:00",
        "userId": "142",
        "role": "SUPER ADMIN",
        "trade": "Game Design"})
        .set('Authorization', 'shfsijdk')

        expect(response.statusCode).toBe(401)

        if(response.statusCode == 401){
            console.log(response.res.statusCode,response.res.statusMessage);
        }
    })    

    it("UPDATE_EXAM_TRADE_BY_ID -fail --NO_ID_MENTIONED", async ()=> {
        const response = await sup(url).put('examTrade/updateExamTrade/')
        .send({"key": "ques",
        "title": name,
        "examType": "Skill Assessment Exam",
        "educationType": "Engineering",
        "poweredBy": "Emerge",
        "duration": "33",
        "examTime": "2022-09-09 20:44:00",
        "userId": "142",
        "role": "SUPER ADMIN",
        "trade": "Game Design"})
        .set('Authorization', 'bearer ' + auth.token)

        expect(response.statusCode).toBe(404)

        if(response.statusCode == 404){
            console.log(response.res.statusCode,response.res.statusMessage);
        }
    })

})

//------------------------------------------------------------------------------

describe('Delete_Exam_Trade_By_ID', () => {
    it('DELETE_EXAM_TRADE_BY_ID -pass', async () => {
        const response = await sup(url).del('examTrade/deleteExamTrade/'+examTrad_id) 

        .set ('Authorization', 'bearer ' + auth.token)
        
        expect(response.statusCode).toBe(200)

        if(response.statusCode == 200){
            console.log(response._body.result);
        }
    })

    it('DELETE_EXAM_TRADE_BY_ID fail --WRONG_URL', async () => {
        const response = await sup(url).del('examTrade/deleteExamTrade')

        .set ('Authorization', 'bearer ' + auth.token)
        
        expect(response.statusCode).toBe(404)

        if(response.statusCode == 404){
            console.log(response.res.statusCode,response.res.statusMessage);
        }
    })


    it('DELETE_EXAM_TRADE_BY_ID fail --UNAUTHORIZATION', async () => {
        const response = await sup(url).del('examTrade/deleteExamTrade/'+examTrad_id)

        //.set ('Authorization', 'bearer ' + auth.token)


        expect(response.statusCode).toBe(401)

        if(response.statusCode == 401){
            console.log(response.res.statusCode,response.res.statusMessage);
        }
    })

    it('DELETE_EXAM_TRADE_BY_ID fail --RANDOM_HARD-CODED_TOKEN', async () => {
        const response = await sup(url).del('examTrade/deleteExamTrade/'+examTrad_id)

        .set ('Authorization', 'dhdkhkhd')

        expect(response.statusCode).toBe(401)

        if(response.statusCode == 401){
            console.log(response.res.statusCode,response.res.statusMessage);
        }
    })

    it("DELETE_EXAM_TRADE_BY_ID fail --ID_DOESN'T_EXIST", async () => {
        const response = await sup(url).del('examTrade/deleteExamTrade/1')

        .set ('Authorization', 'bearer ' + auth.token)
        
        expect(response.statusCode).toBe(400)

        if(response.statusCode == 400){
            console.log(response._body.error.errors);
        }
    })
})



afterAll(async () => {
            const response = await sup(url).del('exam/deleteExam/'+examid) 
           
            .set ('Authorization', 'bearer ' + auth.token)
            expect(response.statusCode).toBe(200)

            if(response.statusCode == 200){
                console.log(response._body.result)}
            })

//jest.setTimeout(50000)
