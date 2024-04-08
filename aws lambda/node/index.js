import AWS from 'aws-sdk';
import pg from 'pg';

// Initialize the AWS SDK
const s3 = new AWS.S3();
const ses = new AWS.SES();

const { Pool } = pg;

// Configuration for RDS connection
const dbConfig = new Pool ({
    user: 'postgres',
    password: 'Lolopopoli1',
    host: 'database-1.ctsqgq0oquzz.ap-southeast-1.rds.amazonaws.com',
    port: 5432,
    database: 'postgres'
});

export const handler = async (event, context) => {
    // Specify the S3 bucket name
    const bucketName = 'book-email'; // Replace with your bucket name
    
    try {
        // Connect to RDS instance
        const result = await dbConfig.query(`SELECT email FROM email`)

        const emails = result.rows.map(row => row.email);

        // Retrieve the HTML email template from S3
        const emailTemplate = await s3.getObject({ Bucket: bucketName, Key: 'email.html' }).promise();

        // Email content
        const emailContent = emailTemplate.Body.toString('utf-8');

        // Send the same email content to all recipients
        const params = {
            Source: 'programmeredward@gmail.com', // Replace with your verified "From" address
            Destination: { ToAddresses: emails },
            Message: {
                Subject: { Data: 'Your Weekly Book Recommendation!', Charset: 'UTF-8' },
                Body: { Html: { Data: emailContent, Charset: 'UTF-8' } }
            }
        };
        
        await ses.sendEmail(params).promise();
        console.log(`Email sent to ${emails.length} recipients`);

        // Close connection to RDS
    } catch (error) {
        console.error(`An error occurred: ${error}`);
    }
};
