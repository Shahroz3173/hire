import api from './api.js'

export const generateInterviewReport = async ({title, jobDescription, selfDescription, resumeFile }) => {

    const formData = new FormData()
    formData.append("title", title)
    formData.append("jobDescription", jobDescription)
    formData.append("selfDescription", selfDescription)
    formData.append("resume", resumeFile)

    const response = await api.post("/interview/", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return response.data

}

export const getInterviewReportById = async (interviewId) => {
    const response = await api.get(`/interview/report/${interviewId}`)
    return response.data
}

export const getAllInterviewReports = async () => {
    const response = await api.get("/interview/reports")

    return response.data
}

export const generateResumePdf = async ({ interviewReportId }) => {
    const response = await api.post(`/interview/resume/pdf/${interviewReportId}`, null, {
        responseType: "blob"
    })

    return response.data
}

export const deleteInterviewReport = async ({ interviewId }) => {
    const response = await api.delete(`/interview/report/${interviewId}`)
    return response.data
}