import boto3
import psycopg2  # Import psycopg2-binary

# Initialize the AWS SDK
s3 = boto3.client('s3')
ses = boto3.client('ses')

# Configuration for RDS connection
db_config = {
    'dbname': 'postgres',
    'user': 'postgres',
    'password': 'Lolopopoli1',
    'host': 'database-1.ctsqgq0oquzz.ap-southeast-1.rds.amazonaws.com',
    'port': 5432
}

def lambda_handler(event, context):
    # Specify the S3 bucket name
    bucket_name = 'book-email'  # Replace with your bucket name
    
    try:
        # Connect to RDS instance
        conn = psycopg2.connect(**db_config)  # Use psycopg2-binary
        cursor = conn.cursor()

        # Execute query to retrieve email addresses
        query = 'SELECT email FROM email'
        cursor.execute(query)
        emails = [row[0] for row in cursor.fetchall()]

        # Retrieve the HTML email template from S3
        email_template = s3.get_object(Bucket=bucket_name, Key='email.html')
        email_content = email_template['Body'].read().decode('utf-8')

        # Send the same email content to all recipients
        params = {
            'Source': 'programmeredward@gmail.com',  # Replace with your verified "From" address
            'Destination': {'ToAddresses': emails},
            'Message': {
                'Subject': {'Data': 'Your Weekly Book Recommendation!', 'Charset': 'UTF-8'},
                'Body': {'Html': {'Data': email_content, 'Charset': 'UTF-8'}}
            }
        }
        
        ses.send_email(**params)
        print(f"Email sent to {len(emails)} recipients")

        # Close connection to RDS
        cursor.close()
        conn.close()
    except Exception as e:
        print(f"An error occurred: {e}")
