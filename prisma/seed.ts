// import { PrismaClient } from '@prisma/client';
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  
  await prisma.emRole.createMany({
    data: [
      { roleName: 'Admin' },
      { roleName: 'User' },
    ],
  });

  
  await prisma.emCountry.createMany({
    data: [
      { countryName: 'India' },
      { countryName: 'Pakistan' },
    ],
  });

  
  await prisma.emState.createMany({
    data: [
      { stateName: 'Haryana', countryId: 1 },
      { stateName: 'Punjab', countryId: 1 },
      { stateName: 'Lahore', countryId: 2 },
    ],
  });

  
  await prisma.emCities.createMany({
    data: [
      { cityName: 'Yamunanagar', stateId: 1 },
      { cityName: 'Ludhiana', stateId: 2 },
      { cityName: 'Jaipur', stateId: 3 },
    ],
  });

  
  await prisma.emUser.createMany({
    data: [
      {
        userFirstName: 'Jatin',
        userLastName: 'Sharma',
        userEmail: 'jatin@gmail.com',
        userPhone: '1234567890',
        userCity: 'Yamunanagar',
        userState: 'Haryana',
        userCountry: 'India',
        userPassword: 'Test@gmail.com', 
        userGender: 'Male',
        userRoleId: 1, 
      },
      {
        userFirstName: 'Satyam',
        userLastName: 'Garg',
        userEmail: 'satyam@gmail.com',
        userPhone: '0987654321',
        userCity: 'Lahore',
        userState: 'Lahore',
        userCountry: 'Pakistan',
        userPassword: 'satyam@123', 
        userGender: 'Male',
        userRoleId: 2, 
      },
    ],
  });

  console.log('Seeding completed!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

