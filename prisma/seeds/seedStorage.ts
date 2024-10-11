import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function StorageSeed() {
  const numberOfRooms = 3;
  const numberOfCabinets = 5;
  const numberOfShelves = 10;

  const roomNames = [];
  for (let i = 1; i <= numberOfRooms; i++) {
    const roomName = `Room${i}`;
    roomNames.push(roomName);

    await prisma.room.create({
      data: {
        name: roomName,
      },
    });
  }

  for (let i = 0; i < roomNames.length; i++) {
    const roomId = i + 1;
    const roomName = roomNames[i]; 

    for (let j = 1; j <= numberOfCabinets; j++) {
      const cabinetName = `Cabinet${j}`;

      for (let k = 1; k <= numberOfShelves; k++) {
        const shelfName = `Shelf${k}`;
        
        const storagelocation = `${roomName}-${cabinetName}-${shelfName}`;
        
        await prisma.storage.create({
          data: {
            roomId: roomId,
            location: storagelocation,
            name: null,
            description: `Description for ${storagelocation}`, 
          },
        });
      }
    }
  }

  console.log('Seeding completed.');
}
