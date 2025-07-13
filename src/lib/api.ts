// utils/api.ts


import { GraphQLClient, gql } from "graphql-request"

export const client = new GraphQLClient("https://carrercraft-ai-backend-1.onrender.com/graphql") // your GraphQL endpoint
// export const client = new GraphQLClient("http://localhost:8000/graphql") // your GraphQL endpoint

// graphql query 

export const Get_cold_email=gql`
query getColdEmails{
  getColdEmails{
    id
    fileUrl
    data
    userId
  }
}
`

export const GET_COLD_EMAIL_BY_USERID=gql`
query getColdEmailByUserId($userId:String!){
getColdEmailByUserId(userId: $userId){
    id
    fileUrl
    data
    userId
  }
}
`

export const getColdEmailById = gql`
  query getColdEmailById($id: String!) {
    getColdEmailById(id: $id) {
      id
      fileUrl
      data
      userId
    }
  }
`


export const Get_cover_letter = gql`
  query getCoverletter {
    getCoverletter {
      id
      fileUrl
      data
      userId
    }
  }
`

export const Get_cover_letter_by_userId = gql`
  query getCoverletterByUserId($userId: String!) {
    getCoverletterByUserId(userId: $userId) {
      id
      fileUrl
      data
      userId
    }
  }
`

export const getCoverletterById = gql`
  query getCoverletterById($id: String!) {
    getCoverletterById(id: $id) {
      id
      fileUrl
      data
      userId
    }
  }
`

export const GET_RESUME = gql`
  query getResume {
    getResume {
      id
      fileUrl
      resume_data
    }
  }
`

export const GET_RESUME_BY_USER_ID = gql`
  query getResumeByUserId($userId: String!) {
    getResumeByUserId(userId: $userId) {
      id
      fileUrl
      resume_data
    }
  }
`

export const getResumeById = gql`
  query getResumeById($id: String!) {
    getResumeById(id: $id) {
      id
      fileUrl
      resume_data
    }
  }
`

export const GET_JOBS = gql`
  query getJobs {
    getJobs {
      id
      url
      title
      userId
      company
      description
      location
      type
    }
  }
`

export const GET_JOBS_BY_USER_ID = gql`
  query getJobbyUserId($userId: String!) {
    getJobbyUserId(userId: $userId) {
      id
      url
      title
      userId
      company
      description
      location
      type
    }
  }
`

export const getJobById = gql`
  query getJobbyId($id: String!) {
    getJobbyId(id: $id) {
      id
      url
      title
      userId
      company
      description
      location
      type
    }
  }
  `



export async function uploadAndParseResume(file: File, userId: string) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("userId", userId);

  const res = await fetch(`https://carrercraft-ai-backend-1.onrender.com/upload-parse-resume`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  localStorage.setItem("resumeId",data.resume.id );
  return res;
}
// export async function uploadAndParseResume(file: File, userId: string) {
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("userId", userId);

//   const res = await fetch(`http://localhost:8000/upload-parse-resume`, {
//     method: "POST",
//     body: formData,
//   });
//   const data = await res.json();
//   localStorage.setItem("resumeId",data.resume.id );
//   return res;
// }

export const generateATS = `
  mutation GenerateATS($resumeId: String!, $userId: String!) {
  runATSAnalysis(resumeId:$resumeId, userId: $userId) {
     id
     score
     missingSkills
     Issues
     atsResultData
     suggestions
     userId
     resumeId
  }
}
  `



export async function uploadJob(url: string, type: string, userId: string) {
  const query = `
    mutation UploadJob($url: String!, $userId: String!, $type: String!) {
      uploadJob(url: $url, userId: $userId, type: $type) {
        id
        title
        url
      }
    }
  `;

  const res = await fetch(`https://carrercraft-ai-backend-1.onrender.com/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { url, userId, type } }),
  });

  const data = await res.json();
  localStorage.setItem("jobId", data.data.uploadJob.id);
  return data.data.uploadJob;
}


// export async function uploadJob(url: string, type: string, userId: string) {
//   const query = `
//     mutation UploadJob($url: String!, $userId: String!, $type: String!) {
//       uploadJob(url: $url, userId: $userId, type: $type) {
//         id
//         title
//         url
//       }
//     }
//   `;

//   const res = await fetch(`http://localhost:8000/graphql`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ query, variables: { url, userId, type } }),
//   });

//   const data = await res.json();
//   localStorage.setItem("jobId", data.data.uploadJob.id);
//   return data.data.uploadJob;
// }

export async function generateFinalOutput(
  resumeId: string,
  jobId: string,
  userId: string,
  type: "cover_letter" | "cold_email"
) {
  const res = await fetch(`https://carrercraft-ai-backend-1.onrender.com/${type}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resumeId, jobId, userId }),
  });
 
  const data = await res.json();
  
   if (type === 'cover_letter') {
     localStorage.setItem("cover_letterId", data.savedCoverLetter.id);
     localStorage.setItem('coverletter_gen','true');
   } else {
     localStorage.setItem("emailId", data.coldEmail.id);
     localStorage.setItem('coldemail_gen','true');
   }
  return data;
}

// export async function generateFinalOutput(
//   resumeId: string,
//   jobId: string,
//   userId: string,
//   type: "cover_letter" | "cold_email"
// ) {
//   const res = await fetch(`http://localhost:8000/${type}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ resumeId, jobId, userId }),
//   });
 
//   const data = await res.json();
  
//    if (type === 'cover_letter') {
//      localStorage.setItem("cover_letterId", data.savedCoverLetter.id);
//      localStorage.setItem('coverletter_gen','true');
//    } else {
//      localStorage.setItem("emailId", data.coldEmail.id);
//      localStorage.setItem('coldemail_gen','true');
//    }
//   return data;
// }


export async function skill_analysis(resumeId:string , jobId:string , userId:string){
  try{
    const response=await fetch("https://carrercraft-ai-backend-1.onrender.com/skill_analysis",{
    method:"POST",
    headers:{"Content-type":"application/json"},
    body:JSON.stringify({
      resumeId,jobId,userId
    })
  })
  const data=await response.json();
  console.log(data)
  return data;
  }
  catch(err){
    console.log(err, "Error while fetching the information!")
  }
}



