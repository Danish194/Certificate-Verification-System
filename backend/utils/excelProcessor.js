import XLSX from 'xlsx';

export const processExcelFile = async (file) => {
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);
    return data.map(row => ({
        certificateId: row['Certificate ID'],
        studentName: row['Student Name'],
        internshipDomain: row['Internship Domain'],
        startDate: new Date(row['Start Date']),
        endDate: new Date(row['End Date']),
    }));
};
