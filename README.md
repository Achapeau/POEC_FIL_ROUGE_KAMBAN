# POEC_FIL_ROUGE_KAMBAN

1. **Rename the Sample File**:

Rename the **application.copy properties** file to application.properties.

2. **Edit application.properties**:

Open the **application.properties** file in a text editor and update the following properties:

- **spring.application.name**: Replace **YOUR_PROJECT_NAME** with your project's name.

- **server.port**: Specify the port number on which you want your server to run.

- **spring.datasource.url**: Enter the JDBC URL of your MySQL database. Replace **YOUR_URL, YOUR_DATABASE_PORT**, and **YOUR_DATABASE_NAME** with your database's URL, port, and name respectively.

- **spring.datasource.username**: Provide the username to access your MySQL database.

- **spring.datasource.password**: Provide the password corresponding to the username.

- **spring.datasource.driver-class-name**: Ensure that the driver class name matches your MySQL driver.

- **spring.jpa.hibernate.ddl-auto**: This property determines how Hibernate creates database schemas. For production, consider changing it to **update** or **validate**.

- **security.jwt.secret-key**: Replace **CREATE_AND_USE_YOUR_OWN_SECRET_KEY** with your own secret key for JWT token generation.

- **security.jwt.expiration-time**: Specify the expiration time for JWT tokens in milliseconds.

3. Save the Changes:

Save the **application.properties** file after making the necessary changes.

# Example Configuration

```
spring.application.name=YourProjectName
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=create-drop
security.jwt.secret-key=YourSecretKey
# 30 minutes in milliseconds
security.jwt.expiration-time=1800000
```

# Important Notes

- Ensure that all placeholders (**YOUR_PROJECT_NAME, YOUR_URL,** etc.) are replaced with appropriate values.

- Keep your **application.properties** file secure and do not expose sensitive information such as passwords and secret keys.
