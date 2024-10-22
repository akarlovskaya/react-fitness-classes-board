import { assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { setup, teardown } from './helpers';

const mockUser = {
    uid: 'sally',
};

const mockData = {
    'users/sally': {
        // roles: ['admin']
    },
    'workouts/abc': {
        cost: "21",
        description: "Strengthen and lengthen your muscles with this mat-based Pilates class.",
        uid: "terry"
    }
};

describe('Database rules', () => {
    // isolate test for debugging - test.only()
    let db;
  
    // Applies only to tests in this describe block
    beforeAll(async () => {
      db = await setup(mockUser, mockData);
    });
  
    afterAll(async () => {
      await teardown();
    });

    test('deny when reading an unauthorized collection', async () => {
        const ref = db.collection('secret-stuff');
  
        expect( await assertFails( ref.get() ) );
    
      });
  
    
  });