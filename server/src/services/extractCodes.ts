import path from 'path';
import { PDFParse } from 'pdf-parse';

export const extractCodes = async (file: Express.Multer.File): Promise<{ success: boolean, message: string, codes?: string[] }> => {
    try {
        let text = '';
        const fileExtension = path.extname(file.originalname).toLowerCase();

        // Check file type and extract text accordingly
        if (fileExtension === '.txt') {
            text = file.buffer.toString('utf8');
        } else if (fileExtension === '.pdf') {
            const parser = new PDFParse({ data: file.buffer });
            const result = await parser.getText();
            text = result.text;
            await parser.destroy();
        } else {
            return {
                success: false,
                message: "Unsupported file type. Only .txt and .pdf files are supported."
            };
        }

        if (!text || text.trim().length === 0) {
            return { success: false, message: "File is empty or contains no text" };
        }

        // Split text into lines and extract non-empty lines as codes
        const codes: string[] = text
            .split(/\r?\n/)
            .map(line => line.trim())
            .filter(line => line.length > 0);

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