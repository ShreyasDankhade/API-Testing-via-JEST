var sup = require ('supertest');
var auth = require('./token');
//var con = require('./jest.config')
var url = 'enter the URL'
var nmae = "IBM";
var cid;
var jid;



var companyPayload = ({
    "key": "company",
    "name": nmae,
    "contactPersonName": "wwws",
    "emailId": "fgd@d.com",
    "mobileNo": 2323353232,
    "fromDate": "undefined",
    "toDate": "undefined",
    "companyType": "Private",
    "password":"company@1234",
    "totalNoOfEmployees": "less than 100",
    "status": "Active",
    "address": "Active"
})




beforeAll(( async () => {
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
        const response = await sup(url).post('company/createCompanyDetails')
        .send(companyPayload)
             .set('Authorization', 'bearer ' + auth.token)
             expect(response.statusCode).toBe(200)})


             it("To check the jobPostid",async () => {
                const response = await sup(url).get('company/getAllCompanyDetails')
                .set('Authorization', 'bearer ' + auth.token)
               // console.log(response._body.result.companyDetails)
                expect(response.statusCode).toBe(200)
                const ci = response._body.result.companyDetails.filter((x) => x.name == nmae);
                cid = ci[0].id;
                console.log(cid)
                //console.log(jobPost1)
            })
            
          

})


describe("Super_Admin_Login",()=>{
      it('SUPER_ADMIN_LOGIN -fail --WRONG_URL', async () => {
        const response = await sup(url).post('user/logi')
          .send({
            "email": "ffeee3e@gmail.com",
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



describe('Create_Job_Post', ()=>{
    it("CREATE_JOB_POST --pass",async ()=>{
        const response = await sup(url).post('jobPost/createJobPost')
       // console.log(response)
        .send({
            "companyId": cid,
            "jobTitle": "Game Designer3",
            "jobDesc": "Designs to enhance the looks of the game.",
            "jobLocation": "Mumbai",
            "linkToApply": "www.gamedesign.com",
            "jobSource": "",
            "educationType": "Engineering",
            "requiredExperience": true,
            "totalNoOfVaccancies": 2,
            "lastDateToApply": "2022-11-23",
            "courseType": "Game Design3",
            "salary": "90k",
            "status": "ACTIVE",
            "isPremium": "ACTIVE",
            "skillAssessment": false
            })

    .set('Authorization', 'bearer ' + auth.token)

        expect(response.statusCode).toBe(200)

        if(response.statusCode == 200){
            console.log(response._body.result);
        }
     })

     it("To check the Companyid",async () => {
        const response = await sup(url).get('jobPost/getAllJobPost')
        .set('Authorization', 'bearer ' + auth.token)
        console.log(response._body.result);
        expect(response.statusCode).toBe(200)
        const jtid = response._body.result.jobPost.filter((y) => y.companyDetails.name == nmae)
        jid=jtid[0].id
        console.log(jid)
    })

    it("CREATE_JOB_POST -fail --WRONG_URL",async ()=>{
        const response = await sup(url).post('jobPost/createJobPos')
       // console.log(response)
        .send({
            "companyId": cid,
            "jobTitle": "Game Designer3",
            "jobDesc": "Designs to enhance the looks of the game.",
            "jobLocation": "Mumbai",
            "linkToApply": "www.gamedesign.com",
            "jobSource": "",
            "educationType": "Engineering",
            "requiredExperience": true,
            "totalNoOfVaccancies": 2,
            "lastDateToApply": "2022-11-23",
            "courseType": "Game Design3",
            "salary": "90k",
            "status": "ACTIVE",
            "isPremium": "ACTIVE",
            "skillAssessment": false
            })
    
    .set('Authorization', 'bearer ' + auth.token)
    
        expect(response.statusCode).toBe(404)
    
        if(response.statusCode == 404){
            console.log(response.res.statusCode,response.res.statusMessage);
             }
        })
    
    it("CREATE_JOB_POST -fail --UNAUTHORIZED",async ()=>{
        const response = await sup(url).post('jobPost/createJobPost')
       // console.log(response)
        .send({
            "companyId": cid,
            "jobTitle": "Game Designer3",
            "jobDesc": "Designs to enhance the looks of the game.",
            "jobLocation": "Mumbai",
            "linkToApply": "www.gamedesign.com",
            "jobSource": "",
            "educationType": "Engineering",
            "requiredExperience": true,
            "totalNoOfVaccancies": 2,
            "lastDateToApply": "2022-11-23",
            "courseType": "Game Design3",
            "salary": "90k",
            "status": "ACTIVE",
            "isPremium": "ACTIVE",
            "skillAssessment": false
            })

    //.set('Authorization', 'bearer ' + auth.token)
   //

        expect(response.statusCode).toBe(401)

        if(response.statusCode == 401){
            console.log(response.res.statusCode,response.res.statusMessage);
        }
     })

    it("CREATE_JOB_POST -fail --NO_companyId",async ()=>{
    const response = await sup(url).post('jobPost/createJobPost')
   // console.log(response)
    .send({
        "companyId": "",
        "jobTitle": "Game Designer3",
        "jobDesc": "Designs to enhance the looks of the game.",
        "jobLocation": "Mumbai",
        "linkToApply": "www.gamedesign.com",
        "jobSource": "",
        "educationType": "Engineering",
        "requiredExperience": true,
        "totalNoOfVaccancies": 2,
        "jobPostedDate": "2022-09-07T07:54:59.019Z",
        "lastDateToApply": "2022-11-23",
        "courseType": "Game Design3",
        "salary": "90k",
        "status": "ACTIVE",
        "isPremium": "ACTIVE",
        "skillAssessment": false
        })

.set('Authorization', 'bearer ' + auth.token)
// console.log(response);
    expect(response.statusCode).toBe(500)

    if(response.statusCode == 500){
        console.log(response._body.error.errors);
    }
})


    it("CREATE_JOB_POST -fail --NO_requiredExperience",async ()=>{
    const response = await sup(url).post('jobPost/createJobPost')
   // console.log(response)
    .send({
        "companyId": cid,
        "jobTitle": "Game Designer3",
        "jobDesc": "Designs to enhance the looks of the game.",
        "jobLocation": "Mumbai",
        "linkToApply": "www.gamedesign.com",
        "jobSource": "",
        "educationType": "Engineering",
        "requiredExperience": "",
        "totalNoOfVaccancies": 2,
        "jobPostedDate": "2022-09-07T07:54:59.019Z",
        "lastDateToApply": "2022-11-23",
        "courseType": "Game Design3",
        "salary": "90k",
        "status": "ACTIVE",
        "isPremium": "ACTIVE",
        "skillAssessment": false
        })

.set('Authorization', 'bearer ' + auth.token)
// console.log(response);
    expect(response.statusCode).toBe(500)

    if(response.statusCode == 500){
        console.log(response._body.error.errors);
    }
})

    it("CREATE_JOB_POST -fail --NO_totalNoOfVaccancies",async ()=>{
    const response = await sup(url).post('jobPost/createJobPost')
   // console.log(response)
    .send({
        "companyId": cid,
        "jobTitle": "Game Designer3",
        "jobDesc": "Designs to enhance the looks of the game.",
        "jobLocation": "Mumbai",
        "linkToApply": "www.gamedesign.com",
        "jobSource": "",
        "educationType": "Engineering",
        "requiredExperience": true,
        "totalNoOfVaccancies": "",
        "jobPostedDate": "2022-09-07T07:54:59.019Z",
        "lastDateToApply": "2022-11-23",
        "courseType": "Game Design3",
        "salary": "90k",
        "status": "ACTIVE",
        "isPremium": "ACTIVE",
        "skillAssessment": false
        })

.set('Authorization', 'bearer ' + auth.token)

    expect(response.statusCode).toBe(500)

    if(response.statusCode == 500){
        console.log(response._body.error.errors);
    }
 })


    it("CREATE_JOB_POST -fail --NO_lastDateToApply",async ()=>{
    const response = await sup(url).post('jobPost/createJobPost')
   // console.log(response)
    .send({
        "companyId": cid,
        "jobTitle": "Game Designer3",
        "jobDesc": "Designs to enhance the looks of the game.",
        "jobLocation": "Mumbai",
        "linkToApply": "www.gamedesign.com",
        "jobSource": "",
        "educationType": "Engineering",
        "requiredExperience": true,
        "totalNoOfVaccancies": 2,
        "jobPostedDate": "2022-09-07T07:54:59.019Z",
        "lastDateToApply": "",
        "courseType": "Game Design3",
        "salary": "90k",
        "status": "ACTIVE",
        "isPremium": "ACTIVE",
        "skillAssessment": false
        })

.set('Authorization', 'bearer ' + auth.token)

    expect(response.statusCode).toBe(500)

    if(response.statusCode == 500){
        console.log(response._body.error.errors);
    }
 })

    it("CREATE_JOB_POST -fail --NO_status",async ()=>{
    const response = await sup(url).post('jobPost/createJobPost')
   // console.log(response)
    .send({
        "companyId": cid,
        "jobTitle": "Game Designer3",
        "jobDesc": "Designs to enhance the looks of the game.",
        "jobLocation": "Mumbai",
        "linkToApply": "www.gamedesign.com",
        "jobSource": "",
        "educationType": "Engineering",
        "requiredExperience": true,
        "totalNoOfVaccancies": 2,
        "jobPostedDate": "2022-09-07T07:54:59.019Z",
        "lastDateToApply": "2022-11-23",
        "courseType": "Game Design3",
        "salary": "90k",
        "status": "",
        "isPremium": "ACTIVE",
        "skillAssessment": false
        })

.set('Authorization', 'bearer ' + auth.token)
// console.log(response);
    expect(response.statusCode).toBe(500)

    if(response.statusCode == 500){
        console.log(response._body.error.errors);
    }
})

    it("CREATE_JOB_POST -fail --NO_isPremium",async ()=>{
    const response = await sup(url).post('jobPost/createJobPost')
   // console.log(response)
    .send({
        "companyId": cid,
        "jobTitle": "Game Designer3",
        "jobDesc": "Designs to enhance the looks of the game.",
        "jobLocation": "Mumbai",
        "linkToApply": "www.gamedesign.com",
        "jobSource": "",
        "educationType": "Engineering",
        "requiredExperience": true,
        "totalNoOfVaccancies": 2,
        "jobPostedDate": "2022-09-07T07:54:59.019Z",
        "lastDateToApply": "2022-11-23",
        "courseType": "Game Design3",
        "salary": "90k",
        "status": "ACTIVE",
        "isPremium": "",
        "skillAssessment": false
        })

.set('Authorization', 'bearer ' + auth.token)
// console.log(response);
    expect(response.statusCode).toBe(500)

    if(response.statusCode == 500){
        console.log(response._body.error.errors);
    }
})

    it("CREATE_JOB_POST-fail --NO_skillAssessment",async ()=>{
    const response = await sup(url).post('jobPost/createJobPost')
   // console.log(response)
    .send({
        "companyId": cid,
        "jobTitle": "Game Designer3",
        "jobDesc": "Designs to enhance the looks of the game.",
        "jobLocation": "Mumbai",
        "linkToApply": "www.gamedesign.com",
        "jobSource": "",
        "educationType": "Engineering",
        "requiredExperience": true,
        "totalNoOfVaccancies": 2,
        "jobPostedDate": "2022-09-07T07:54:59.019Z",
        "lastDateToApply": "2022-11-23",
        "courseType": "Game Design3",
        "salary": "90k",
        "status": "ACTIVE",
        "isPremium": "ACTIVE",
        "skillAssessment": ""
        })

.set('Authorization', 'bearer ' + auth.token)
// console.log(response);
    expect(response.statusCode).toBe(500)

    if(response.statusCode == 500){
        console.log(response._body.error.errors);
    }
})
})

//------------------------------------------------------------------------------

describe("Get_All_Job_Post", ()=>{
    it("GET_ALL_JOB_POST --pass", async ()=>{
    const response = await sup(url).get('jobPost/getAllJobPost')

    .set('Authorization', 'bearer ' + auth.token)
    //console.log(response)

    expect(response.statusCode).toBe(200)

    if (response.statusCode == 200){
        console.log(response._body.result.jobPost)
    }
})

    it("GET_ALL_JOB_POST -fail --WRONG_URL", async ()=>{
        const response = await sup(url).get('jobPost/getAllJobPos')
    
        .set('Authorization', 'bearer ' + auth.token)

        //console.log(response)
    
        expect(response.statusCode).toBe(404)
    
        if (response.statusCode == 404){
            console.log(response.res.statusCode,response.res.statusMessage)
        }
})
        
    it("GET_ALL_JOB_POST -fail --UNAUTHORIZED", async ()=>{
            const response = await sup(url).get('jobPost/getAllJobPost')
        
          //.set('Authorization', 'bearer ' + auth.token)
            
            //console.log(response)
        
            expect(response.statusCode).toBe(401)
        
            if (response.statusCode == 401){
                console.log(response.res.statusCode,response.res.statusMessage)
         }
    })
})

//------------------------------------------------------------------------------

describe('Get_All_By_Company_ID', () =>{
    it('GET_ALL_BY_COMPANY_ID --pass', async ()=> {
        const response = await sup(url).get('jobPost/getJobPostByCompanyId/'+cid)
        
        .set('Authorization', 'bearer ' + auth.token)
        //console.log(response)


        expect(response.statusCode).toBe(200)

        if (response.statusCode == 200){
            console.log(response._body.result.jobPost);
        }
    })

    it('GET_ALL_BY_COMPANY_ID -fail --WRONG_URL', async ()=> {
        const response = await sup(url).get('jobPost/getJobPostByCompanyI')
        
        .set('Authorization', 'bearer ' + auth.token)
        //console.log(response)


        expect(response.statusCode).toBe(404)

        if (response.statusCode == 404){
            console.log(response.res.statusCode,response.res.statusMessage);
        }
    })

    it("GET_ALL_BY_COMPANY_ID -fail --UNAUTHORIZED", async ()=> {
        const response = await sup(url).get('jobPost/getJobPostByCompanyId/7')
        
        //.set('Authorization', 'bearer ' + auth.token)
        //console.log(response)

        expect(response.statusCode).toBe(401)

        if (response.statusCode == 401){
            console.log(response.res.statusCode,response.res.statusMessage);
        }
    })

    it('GET_ALL_BY_COMPANY_ID -fail --NO_ID_MENTIONED', async ()=> {
        const response = await sup(url).get('jobPost/getJobPostByCompanyId')
        
        .set('Authorization', 'bearer ' + auth.token)
        //console.log(response)


        expect(response.statusCode).toBe(404)

        if (response.statusCode == 404){
            console.log(response.res.statusCode,response.res.statusMessage);
        }
    })

    it("GET_ALL_BY_COMPANY_ID -fail --ID_DOESN'T_EXIST", async ()=> {
        const response = await sup(url).get('jobPost/getJobPostByCompanyId/10')
        
        .set('Authorization', 'bearer ' + auth.token)
       //console.log(response)


        expect(response.statusCode).toBe(200)

        if (response.statusCode == 200){
            console.log(response._body.result);
        }
    })

})

//------------------------------------------------------------------------------

describe("Get_Job_Post_By_Id", ()=>{
    it("GET_JOB_POST_BY_ID --pass", async ()=>{
    const response = await sup(url).get('jobPost/getJobById/'+jid)

    .set('Authorization', 'bearer ' + auth.token)
    //console.log(response)
    expect(response.statusCode).toBe(200)

    if (response.statusCode == 200){
        console.log(response._body.result)
    }
})

    it("GET_JOB_POST_BY_ID -fail --WRONG_URL", async ()=>{
        const response = await sup(url).get('jobPost/getJobById')
    
        .set('Authorization', 'bearer ' + auth.token)

        //console.log(response)
        expect(response.statusCode).toBe(404)
        if (response.statusCode == 404){
            console.log(response.res.statusCode,response.res.statusMessage)
        }
})
        
    it("GET_JOB_POST_BY_ID -fail --UNAUTHORIZED", async ()=>{
            const response = await sup(url).get('jobPost/getJobById/'+cid)
        
          //.set('Authorization', 'bearer ' + auth.token)
            //console.log(response)
        
            expect(response.statusCode).toBe(401)
        
            if (response.statusCode == 401){
                console.log(response.res.statusCode,response.res.statusMessage)
         }
    })

    it('GET_ALL_JOB_POST_BY_ID -fail --NO_ID_MENTIONED', async ()=> {
        const response = await sup(url).get('jobPost/getJobById/')
        
        .set('Authorization', 'bearer ' + auth.token)
        //console.log(response)


        expect(response.statusCode).toBe(404)

        if (response.statusCode == 404){
            console.log(response.res.statusCode,response.res.statusMessage);
        }
    })

    it("GET_JOB_POST_BY_ID -fail --ID_DOESN'T_EXIST", async ()=> {
        const response = await sup(url).get('jobPost/getJobById/1000')
        
        .set('Authorization', 'bearer ' + auth.token)
       //console.log(response)


        expect(response.statusCode).toBe(400)

        if (response.statusCode == 400){
            console.log(response.res.statusCode,response.res.statusMessage);
        }
    })
})


//------------------------------------------------------------------------------

describe('Update_Job_Post_By_ID', ()=> {
    it("UPDATE_JOB_POST_BY_ID --pass", async ()=> {
        const response = await sup(url).put('jobPost/updateJobPost/'+jid)
        .send({
                "id": jid,
                "companyId": cid,
                "jobTitle": "PHOTOGRAPHER",
                "jobDesc": "To take photographs of the wildlife in sunderbuns",
                "jobLocation": "BANGLORE",
                "linkToApply": "",
                "jobSource": "",
                "educationType": "ITI",
                "requiredExperience": true,
                "totalNoOfVaccancies": 1,
                "jobPostedDate": "2022-09-07 07:54:59",
                "lastDateToApply": "2022-11-23",
                "courseType": "Photographer",
                "salary": "30,000.00",
                "status": "ACTIVE",
                "isPremium": "ACTIVE",
                "skillAssessment": false
            })
        .set('Authorization', 'bearer ' + auth.token)
      
        expect(response.statusCode).toBe(200)

        if(response.statusCode == 200){
            console.log(response._body.result);
        }
    })

    it("UPDATE_JOB_POST_BY_ID -fail --WRONG_URL", async ()=> {
        const response = await sup(url).put('jobPost/updateJobPos')
        .send({
            "id": jid,
            "companyId": cid,
            "jobTitle": "PHOTOGRAPHER",
            "jobDesc": "To take photographs of the wildlife in sunderbuns",
            "jobLocation": "BANGLORE",
            "linkToApply": "",
            "jobSource": "",
            "educationType": "ITI",
            "requiredExperience": true,
            "totalNoOfVaccancies": 1,
            "jobPostedDate": "2022-09-07 07:54:59",
            "lastDateToApply": "2022-11-23",
            "courseType": "Photographer",
            "salary": "30,000.00",
            "status": "ACTIVE",
            "isPremium": "ACTIVE",
            "skillAssessment": false
        })
        .set('Authorization', 'bearer ' + auth.token)
              //console.log(response)
        expect(response.statusCode).toBe(404)

        if(response.statusCode == 404){
            console.log(response.res.statusCode,response.res.statusMessage);
        }
    })

    it("UPDATE_JOB_POST_BY_ID -fail --UNAUTHORIZED", async ()=> {
        const response = await sup(url).put('jobPost/updateJobPost/'+jid)
        .send({
            "id": jid,
            "companyId": cid,
            "jobTitle": "PHOTOGRAPHER",
            "jobDesc": "To take photographs of the wildlife in sunderbuns",
            "jobLocation": "BANGLORE",
            "linkToApply": "",
            "jobSource": "",
            "educationType": "ITI",
            "requiredExperience": true,
            "totalNoOfVaccancies": 1,
            "jobPostedDate": "2022-09-07 07:54:59",
            "lastDateToApply": "2022-11-23",
            "courseType": "Photographer",
            "salary": "30,000.00",
            "status": "ACTIVE",
            "isPremium": "ACTIVE",
            "skillAssessment": false
        })

        //.set('Authorization', 'bearer ' + auth.token)
      
        expect(response.statusCode).toBe(401)

        if(response.statusCode == 401){
            console.log(response.res.statusCode,response.res.statusMessage);
        }
    })

    it("UPDATE_JOB_POST_BY_ID -fail --RANDOM_HARD-CODED_TOKEN", async ()=> {
        const response = await sup(url).put('jobPost/updateJobPost/'+jid)
        .send({
            "id": jid,
            "companyId": cid,
            "jobTitle": "PHOTOGRAPHER",
            "jobDesc": "To take photographs of the wildlife in sunderbuns",
            "jobLocation": "BANGLORE",
            "linkToApply": "",
            "jobSource": "",
            "educationType": "ITI",
            "requiredExperience": true,
            "totalNoOfVaccancies": 1,
            "jobPostedDate": "2022-09-07 07:54:59",
            "lastDateToApply": "2022-11-23",
            "courseType": "Photographer",
            "salary": "30,000.00",
            "status": "ACTIVE",
            "isPremium": "ACTIVE",
            "skillAssessment": false
        })
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQyLCJyb2xlIjoiU1VQRVIgQURNSU4iLCJpYXQiOjE2NjI1NjkyMjd9.XU1QlmyfgC_tU9ZcKGia5UfjywxIiJPXINX7hlAkHM8')
        //console.log("TOKEN..>>>",auth.token)

        expect(response.statusCode).toBe(401)

        if(response.statusCode == 401){
            console.log(response.res.statusCode,response.res.statusMessage);
        }
    })    

    it("UPDATE_JOB_POST_BY_ID -fail --NO_ID_MENTIONED", async ()=> {
        const response = await sup(url).put('jobPost/updateJobPost/')
        .send({
            "id": "",
            "companyId": cid,
            "jobTitle": "PHOTOGRAPHER",
            "jobDesc": "To take photographs of the wildlife in sunderbuns",
            "jobLocation": "BANGLORE",
            "linkToApply": "",
            "jobSource": "",
            "educationType": "ITI",
            "requiredExperience": true,
            "totalNoOfVaccancies": 1,
            "jobPostedDate": "2022-09-07 07:54:59",
            "lastDateToApply": "2022-11-23",
            "courseType": "Photographer",
            "salary": "30,000.00",
            "status": "ACTIVE",
            "isPremium": "ACTIVE",
            "skillAssessment": false
        })
        .set('Authorization', 'bearer ' + auth.token)
      
        expect(response.statusCode).toBe(404)

        if(response.statusCode == 404){
            console.log(response.res.statusCode,response.res.statusMessage);
        }
    })

    it("UPDATE_JOB_POST_BY_ID -fail --NO_companyId", async ()=> {
        const response = await sup(url).put('jobPost/updateJobPost/'+jid)
        .send(
            {
                "id": jid,
                "companyId": "",
                "jobTitle": "PHOTOGRAPHER",
                "jobDesc": "To take photographs of the wildlife in sunderbuns",
                "jobLocation": "BANGLORE",
                "linkToApply": "",
                "jobSource": "",
                "educationType": "ITI",
                "requiredExperience": true,
                "totalNoOfVaccancies": 1,
                "jobPostedDate": "2022-09-07 07:54:59",
                "lastDateToApply": "2022-11-23",
                "courseType": "Photographer",
                "salary": "30,000.00",
                "status": "ACTIVE",
                "isPremium": "ACTIVE",
                "skillAssessment": false
            })
        .set('Authorization', 'bearer ' + auth.token)
              //console.log(response)
        expect(response.statusCode).toBe(500)

        if(response.statusCode == 500){
            console.log(response._body.error.errors);
        }
    })

    it("UPDATE_JOB_POST_BY_ID -fail --NO_educationType", async ()=> {
        const response = await sup(url).put('jobPost/updateJobPost/'+jid)
        .send(
            {
                "id": jid,
                "companyId": cid,
                "jobTitle": "PHOTOGRAPHER",
                "jobDesc": "To take photographs of the wildlife in sunderbuns",
                "jobLocation": "BANGLORE",
                "linkToApply": "",
                "jobSource": "",
                "educationType": "",
                "requiredExperience": true,
                "totalNoOfVaccancies": 1,
                "jobPostedDate": "2022-09-07 07:54:59",
                "lastDateToApply": "2022-11-23",
                "courseType": "Photographer",
                "salary": "30,000.00",
                "status": "ACTIVE",
                "isPremium": "ACTIVE",
                "skillAssessment": false
            })
        .set('Authorization', 'bearer ' + auth.token)
              //console.log(response)
        expect(response.statusCode).toBe(500)

        if(response.statusCode == 500){
            console.log(response._body.error.errors);
        }
    })

    it("UPDATE_JOB_POST_BY_ID -fail --NO_requiredExperience", async ()=> {
        const response = await sup(url).put('jobPost/updateJobPost/'+jid)
        .send(
            {
                "id": jid,
                "companyId": cid,
                "jobTitle": "PHOTOGRAPHER",
                "jobDesc": "To take photographs of the wildlife in sunderbuns",
                "jobLocation": "BANGLORE",
                "linkToApply": "",
                "jobSource": "",
                "educationType": "ITI",
                "requiredExperience":"",
                "totalNoOfVaccancies": 1,
                "jobPostedDate": "2022-09-07 07:54:59",
                "lastDateToApply": "2022-11-23",
                "courseType": "Photographer",
                "salary": "30,000.00",
                "status": "ACTIVE",
                "isPremium": "ACTIVE",
                "skillAssessment": false
            })
        .set('Authorization', 'bearer ' + auth.token)
              //console.log(response)
        expect(response.statusCode).toBe(500)

        if(response.statusCode == 500){
            console.log(response._body.error.errors);
        }
    })

    it("UPDATE_JOB_POST_BY_ID -fail --NO_totalNoOfVaccancies", async ()=> {
        const response = await sup(url).put('jobPost/updateJobPost/'+jid)
        .send(
            {
                "id": jid,
                "companyId": cid,
                "jobTitle": "PHOTOGRAPHER",
                "jobDesc": "To take photographs of the wildlife in sunderbuns",
                "jobLocation": "BANGLORE",
                "linkToApply": "",
                "jobSource": "",
                "educationType": "ITI",
                "requiredExperience": true,
                "totalNoOfVaccancies": "",
                "jobPostedDate": "2022-09-07 07:54:59",
                "lastDateToApply": "2022-11-23",
                "courseType": "Photographer",
                "salary": "30,000.00",
                "status": "ACTIVE",
                "isPremium": "ACTIVE",
                "skillAssessment": false
            })
        .set('Authorization', 'bearer ' + auth.token)
              //console.log(response)
        expect(response.statusCode).toBe(500)

        if(response.statusCode == 500){
            console.log(response._body.error.errors);
        }
    })

    it("UPDATE_JOB_POST_BY_ID -fail --NO_jobPostedDate", async ()=> {
        const response = await sup(url).put('jobPost/updateJobPost/'+jid)
        .send(
            {
                "id": jid,
                "companyId": cid,
                "jobTitle": "PHOTOGRAPHER",
                "jobDesc": "To take photographs of the wildlife in sunderbuns",
                "jobLocation": "BANGLORE",
                "linkToApply": "",
                "jobSource": "",
                "educationType": "ITI",
                "requiredExperience": true,
                "totalNoOfVaccancies": 1,
                "jobPostedDate": "",
                "lastDateToApply": "2022-11-23",
                "courseType": "Photographer",
                "salary": "30,000.00",
                "status": "ACTIVE",
                "isPremium": "ACTIVE",
                "skillAssessment": false
            })
        .set('Authorization', 'bearer ' + auth.token)
              //console.log(response)
        expect(response.statusCode).toBe(500)

        if(response.statusCode == 500){
            console.log(response._body.error.errors);
        }
    })

    it("UPDATE_JOB_POST_BY_ID -fail --NO_lastDateToApply", async ()=> {
        const response = await sup(url).put('jobPost/updateJobPost/'+jid)
        .send(
            {
                "id": jid,
                "companyId": cid,
                "jobTitle": "PHOTOGRAPHER",
                "jobDesc": "To take photographs of the wildlife in sunderbuns",
                "jobLocation": "BANGLORE",
                "linkToApply": "",
                "jobSource": "",
                "educationType": "ITI",
                "requiredExperience": true,
                "totalNoOfVaccancies": 1,
                "jobPostedDate": "2022-09-07 07:54:59",
                "lastDateToApply": "",
                "courseType": "Photographer",
                "salary": "30,000.00",
                "status": "ACTIVE",
                "isPremium": "ACTIVE",
                "skillAssessment": false
            })
        .set('Authorization', 'bearer ' + auth.token)
              //console.log(response)
        expect(response.statusCode).toBe(500)

        if(response.statusCode == 500){
            console.log(response._body.error.errors);
        }
    })

    it("UPDATE_JOB_POST_BY_ID -fail --NO_status", async ()=> {
        const response = await sup(url).put('jobPost/updateJobPost/'+jid)
        .send(
            {
                "id": jid,
                "companyId": cid,
                "jobTitle": "PHOTOGRAPHER",
                "jobDesc": "To take photographs of the wildlife in sunderbuns",
                "jobLocation": "BANGLORE",
                "linkToApply": "",
                "jobSource": "",
                "educationType": "ITI",
                "requiredExperience": true,
                "totalNoOfVaccancies": 1,
                "jobPostedDate": "2022-09-07 07:54:59",
                "lastDateToApply": "2022-11-23",
                "courseType": "Photographer",
                "salary": "30,000.00",
                "status": "",
                "isPremium": "ACTIVE",
                "skillAssessment": false
            })
        .set('Authorization', 'bearer ' + auth.token)
              //console.log(response)
        expect(response.statusCode).toBe(500)

        if(response.statusCode == 500){
            console.log(response._body.error.errors);
        }
    })

    it("UPDATE_JOB_POST_BY_ID -fail --NO_isPremium", async ()=> {
        const response = await sup(url).put('jobPost/updateJobPost/' +jid)
        .send(
            {
                "id": jid,
                "companyId": cid,
                "jobTitle": "PHOTOGRAPHER",
                "jobDesc": "To take photographs of the wildlife in sunderbuns",
                "jobLocation": "BANGLORE",
                "linkToApply": "",
                "jobSource": "",
                "educationType": "ITI",
                "requiredExperience": true,
                "totalNoOfVaccancies": 1,
                "jobPostedDate": "2022-09-07 07:54:59",
                "lastDateToApply": "2022-11-23",
                "courseType": "Photographer",
                "salary": "30,000.00",
                "status": "ACTIVE",
                "isPremium": "",
                "skillAssessment": false
            })
        .set('Authorization', 'bearer ' + auth.token)
              //console.log(response)
        expect(response.statusCode).toBe(500)

        if(response.statusCode == 500){
            console.log(response._body.error.errors);
        }
    })

    it("UPDATE_JOB_POST_BY_ID -fail --NO_skillAssessment", async ()=> {
        const response = await sup(url).put('jobPost/updateJobPost/' +jid)
        .send(
            {
                "id": jid,
                "companyId": cid,
                "jobTitle": "PHOTOGRAPHER",
                "jobDesc": "To take photographs of the wildlife in sunderbuns",
                "jobLocation": "BANGLORE",
                "linkToApply": "",
                "jobSource": "",
                "educationType": "ITI",
                "requiredExperience": true,
                "totalNoOfVaccancies": 1,
                "jobPostedDate": "2022-09-07 07:54:59",
                "lastDateToApply": "2022-11-23",
                "courseType": "Photographer",
                "salary": "30,000.00",
                "status": "ACTIVE",
                "isPremium": "ACTIVE",
                "skillAssessment": ""
            })
        .set('Authorization', 'bearer ' + auth.token)
              //console.log(response)
        expect(response.statusCode).toBe(500)

        if(response.statusCode == 500){
            console.log(response._body.error.errors);
        }
    })
})

//------------------------------------------------------------------------------

describe('Update_Job_Post_Status_By_ID', ()=> {
    it("UPDATE_JOB_POST_STATUS_BY_ID --pass", async ()=> {
        const response = await sup(url).put('jobPost/updateStatus/' +jid)
        .send({
            "status":"ACTIVE"
        })
        .set('Authorization', 'bearer ' + auth.token)
      
        expect(response.statusCode).toBe(200)

        if(response.statusCode == 200){
            console.log(response._body.result);
        }
    })

    it("UPDATE_JOB_POST_STATUS_BY_ID -fail --WRONG_URL", async ()=> {
        const response = await sup(url).put('jobPost/updateStatu')
        .send({
            "status":"INACTIVE"
        })
        .set('Authorization', 'bearer ' + auth.token)
              //console.log(response)
        expect(response.statusCode).toBe(404)

        if(response.statusCode == 404){
            console.log(response.res.statusCode,response.res.statusMessage);
        }
    })

    it("UPDATE_JOB_POST_STATUS_BY_ID -fail --UNAUTHORIZED", async ()=> {
        const response = await sup(url).put('jobPost/updateStatus/' +jid)
        .send({
            "status":"INACTIVE"
        })
        //.set('Authorization', 'bearer ' + auth.token)
      
    
        expect(response.statusCode).toBe(401)

        if(response.statusCode == 401){
            console.log(response.res.statusCode,response.res.statusMessage);
        }
    })
})

//------------------------------------------------------------------------------

describe('Delete_Job_Post_By_ID', () => {
    it('DELETE_JOB_POST_ID -pass', async () => {
        const response = await sup(url).del('jobPost/deleteJobPost/' +jid)

        .set ('Authorization', 'bearer ' + auth.token)
      
        expect(response.statusCode).toBe(200)

        if(response.statusCode == 200){
            console.log(response._body.result);
        }
    })

    it('DELETE_JOB_POST_BY_ID fail --WRONG_URL', async () => {
        const response = await sup(url).del('jobPost/deleteJobPos')

        .set ('Authorization', 'bearer ' + auth.token)
      
        expect(response.statusCode).toBe(404)

        if(response.statusCode == 404){
            console.log(response.res.statusCode,response.res.statusMessage);
        }
    })

    it('DELETE_JOB_POST_BY_ID fail --UNAUTHORIZATION', async () => {
        const response = await sup(url).del('jobPost/deleteJobPost/' +jid)

        //.set ('Authorization', 'bearer ' + auth.token)
        //console.log("TOKEN..>>>",auth.token)

        expect(response.statusCode).toBe(401)

        if(response.statusCode == 401){
            console.log(response.res.statusCode,response.res.statusMessage);
        }
    })

    it('DELETE_JOB_POST_BY_ID fail --RANDOM_HARD-CODED_TOKEN', async () => {
        const response = await sup(url).del('jobPost/deleteJobPost/72')

        .set ('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQyLCJyb2xlIjoiU1VQRVIgQURNSU4iLCJpYXQiOjE2NjI1ODE3NzF9.P2ZRLwEputV7qGdJk2U5MRmJOURU3uHOBGfjbXYRW')
        //console.log("TOKEN..>>>",auth.token)

        expect(response.statusCode).toBe(401)

        if(response.statusCode == 401){
            console.log(response.res.statusCode,response.res.statusMessage);
        }
    })

    it("DELETE_JOB_POST_BY_ID fail --ID_DOESN'T_EXIST", async () => {
        const response = await sup(url).del('jobPost/deleteJobPost/'+jid)

        .set ('Authorization', 'bearer ' + auth.token)
      
        expect(response.statusCode).toBe(400)

        if(response.statusCode == 400){
            console.log(response.res.statusCode,response.res.statusMessage);
        }
    })
})


afterAll(async () => {
    const response = await sup(url).del('company/deleteCompanyDetails/'+cid)
    .set ('Authorization', 'bearer ' + auth.token)
    expect(response.statusCode).toBe(200)

    if(response.statusCode == 200){
        console.log(response._body.result);
    }
})
