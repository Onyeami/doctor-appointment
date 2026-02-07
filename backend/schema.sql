-- SQL Server Schema for Doctor Appointment App

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
BEGIN
    CREATE TABLE users (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(255) NOT NULL,
        email NVARCHAR(255) NOT NULL UNIQUE,
        password_hash NVARCHAR(255) NOT NULL,
        role NVARCHAR(50) DEFAULT 'patient' CHECK (role IN ('patient', 'doctor', 'admin')),
        created_at DATETIME2 DEFAULT GETDATE()
    )
END;

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'doctors')
BEGIN
    CREATE TABLE doctors (
        id INT IDENTITY(1,1) PRIMARY KEY,
        user_id INT NOT NULL,
        specialty NVARCHAR(100),
        rating DECIMAL(3, 1) DEFAULT 0.0,
        photo_url NVARCHAR(255),
        bio NVARCHAR(MAX),
        hourly_rate DECIMAL(10, 2),
        CONSTRAINT FK_Doctors_Users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
END;

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'appointments')
BEGIN
    CREATE TABLE appointments (
        id INT IDENTITY(1,1) PRIMARY KEY,
        patient_id INT NOT NULL,
        doctor_id INT NOT NULL,
        appointment_date DATETIME2 NOT NULL,
        status NVARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
        notes NVARCHAR(MAX),
        created_at DATETIME2 DEFAULT GETDATE(),
        CONSTRAINT FK_Appointments_Patients FOREIGN KEY (patient_id) REFERENCES users(id) ON DELETE NO ACTION,
        CONSTRAINT FK_Appointments_Doctors FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
    )
END;
