# User Migration

## Migration File
- **File**: `src/migrations/1764682074300-CreateUserTable.ts`
- **Timestamp**: 1764682074300 (positioned BEFORE the existing CreateTaskTable migration at 1764682074400)
- **Purpose**: Creates the `users` table with the same columns as defined in `src/users/user.entity.ts`

## Migration Details

The migration creates a `users` table with the following columns:

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Auto-incrementing primary key |
| email | character varying | UNIQUE, NOT NULL | User email address (unique) |
| password | character varying | NOT NULL | Hashed password |
| name | character varying | NOT NULL | User's full name |
| is_active | boolean | DEFAULT true | Whether user account is active |
| created_at | TIMESTAMP | DEFAULT now() | Record creation timestamp |
| updated_at | TIMESTAMP | DEFAULT now() | Record update timestamp |

## Important Note

**Table creation should ONLY happen via migrations.** Other methods like SQL initialization scripts or manual table creation should not be used.

## Changes Made

1. **init.sql**: Modified to remove table creation and user insertion. The file now only contains a note that table creation is handled by TypeORM migrations.

2. **Seeder**: The user seeder (`src/seeders/user.seeder.ts`) has been marked as deprecated with a warning message. User creation should happen via the application's registration endpoint, not through seeders.

3. **Package.json**: Removed the `seed:users` script to prevent accidental use of the deprecated seeder.

## Usage Instructions

### Running the Migration

1. Ensure the database is running:
   ```bash
   docker compose up -d
   ```

2. Run the migration:
   ```bash
   cd backend
   npm run typeorm -- migration:run -d src/data-source.ts
   ```

3. Verify the migration:
   ```bash
   npm run typeorm -- migration:show -d src/data-source.ts
   ```
   Should show:
   - [X] CreateUserTable1764682074300
   - [X] CreateTaskTable1764682074400

### Creating Users

Users should be created through the application's registration endpoint:
- **Endpoint**: `POST /api/auth/register`
- **Method**: Use the registration form in the frontend or call the API directly

### Rollback (if needed)

To revert the user migration:
```bash
cd backend
npm run typeorm -- migration:revert -d src/data-source.ts
```

## Verification

1. Check the users table in PostgreSQL:
   ```sql
   SELECT * FROM users;
   ```

2. Verify table structure:
   ```sql
   \d users
   ```

## Notes

- The migration timestamp (1764682074300) is intentionally set to be 100 less than the existing task migration (1764682074400) to ensure it runs first
- Passwords are hashed using bcrypt with salt rounds of 10
- User creation should only happen via the application's registration endpoint, not through seeders or SQL scripts

## Dependencies

- TypeORM for database operations
- bcrypt for password hashing
