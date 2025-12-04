import { AppDataSource } from '../data-source';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcryptjs';

async function seedUsers() {
  console.log('==========================================');
  console.log('WARNING: User seeder is deprecated.');
  console.log('User creation should happen via:');
  console.log('1. Migration for table creation');
  console.log('2. Application registration endpoint for user creation');
  console.log('==========================================\n');
  
  console.log('Starting user seeding (deprecated)...');

  // Initialize the data source
  await AppDataSource.initialize();
  console.log('Data source initialized');

  const userRepository = AppDataSource.getRepository(User);

  // Clear existing users (optional - comment out if you want to keep existing data)
  // await userRepository.clear();
  // console.log('Cleared existing users');

  // Create sample users
  const users = [
    {
      email: 'admin@example.com',
      password: await bcrypt.hash('password123', 10),
      name: 'Admin User',
      isActive: true,
    },
    {
      email: 'john.doe@example.com',
      password: await bcrypt.hash('password123', 10),
      name: 'John Doe',
      isActive: true,
    },
    {
      email: 'jane.smith@example.com',
      password: await bcrypt.hash('password123', 10),
      name: 'Jane Smith',
      isActive: true,
    },
    {
      email: 'test.user@example.com',
      password: await bcrypt.hash('password123', 10),
      name: 'Test User',
      isActive: false,
    },
  ];

  // Save users to database
  for (const userData of users) {
    const user = userRepository.create(userData);
    await userRepository.save(user);
    console.log(`Created user: ${user.email}`);
  }

  console.log('User seeding completed!');
  console.log(`Total users seeded: ${users.length}`);

  // Display seeded users
  const allUsers = await userRepository.find();
  console.log('\nSeeded users:');
  allUsers.forEach(user => {
    console.log(`- ${user.name} (${user.email}) - Active: ${user.isActive}`);
  });

  // Close the data source connection
  await AppDataSource.destroy();
  console.log('Data source connection closed');
}

// Run the seeder if this file is executed directly
if (require.main === module) {
  seedUsers().catch(error => {
    console.error('Error seeding users:', error);
    process.exit(1);
  });
}

export { seedUsers };
