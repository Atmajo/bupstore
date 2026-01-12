import path from 'path';

export const extractCodes = async (file: Express.Multer.File): Promise<{ success: boolean, message: string, codes?: string[] }> => {
    try {
        let text = '';
        const fileExtension = path.extname(file.originalname).toLowerCase();

        // Check file type and extract text accordingly
        if (fileExtension === '.txt') {
            text = file.buffer.toString('utf8');
        } else if (fileExtension === '.pdf') {
            // PDF extraction is handled client-side using pdf.js
            // This endpoint should receive the already-extracted text
            return {
                success: false,
                message: "PDF files should be processed client-side. Please use the frontend upload which handles PDF extraction automatically."
            };
        } else {
            return {
                success: false,
                message: "Unsupported file type. Only .txt files are supported for server-side processing. PDF files are processed in the browser."
            };
        }

        if (!text || text.trim().length === 0) {
            return { success: false, message: "File is empty or contains no text" };
        }

        const codePattern = /(\d{4}\s+\d{4})/g;
        const codes: string[] = [];

        let match;
        while ((match = codePattern.exec(text)) !== null) {
            const code = match[1].replace(/\s+/g, '');
            codes.push(code);
        }

        if (codes.length === 0) {
            return {
                success: false,
                message: "No backup codes found in the file",
            };
        }

        return {
            success: true,
            message: `Extracted ${codes.length} backup codes successfully from ${fileExtension} file`,
            codes,
        };
    } catch (error) {
        return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
    }
}