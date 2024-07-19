### NextStream

![diagram-export-20-07-2024-00_25_02](https://github.com/user-attachments/assets/8dabd34d-dc31-46f5-8652-99d1daaac1cd)



### Components Explained


1. **API Gateway**:
   - Serves as the entry point for all client requests.
   - Routes requests to appropriate services like the Upload Service or Streaming Service based on the request path.

2. **Auth Service**:
   - Handles authentication processes, verifying user credentials and generating tokens.
   - Uses Kafka to log status updates or other significant events.

3. **Upload Service**:
   - Manages video uploads by users.
   - Stores videos directly to an S3 bucket and returns a public URL of the uploaded video.
   - Queues a video transcoding task in Redis which triggers the Transcode Service.

4. **Transcode Service**:
   - Processes video files queued in Redis, performing tasks like transcoding videos into different resolutions.
   - Uses ECS for scalable processing power.
   - Outputs transcoded videos as HLS (m3u8) files into S3.

5. **Streaming Service**:
   - Manages direct streaming of video content to clients.
   - Fetches video content directly from S3 based on requests routed through the API Gateway.

6. **Kafka**:
   - Used as a messaging system to handle logs and inter-service communications.
   - Both the Auth and Transcode Services may produce messages, such as logging processing statuses or auth events.

7. **Redis Queue**:
   - Acts as a broker for tasks that need to be processed by the Transcode Service.
   - Ensures that video processing tasks are managed in a scalable, efficient manner.

### Operational Flow

1. **User Authentication**:
   - Users authenticate via the Auth Service which checks credentials and returns a token if successful.

2. **Video Upload and Processing**:
   - Users upload videos through the Upload Service, which stores them in S3 and sends processing tasks to Redis.
   - The Transcode Service, triggered by tasks in Redis, processes the videos in ECS and stores output in S3.

3. **Video Streaming**:
   - The Streaming Service fetches the processed videos directly from S3 and serves them to users, handling different streaming resolutions based on client capabilities or requests.
