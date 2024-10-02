import connectToDb from '@/utils/config/db';
import NewUser from '@/utils/models/user.model';
import { pricingPlans } from '@/data/pricingData';
import { NextResponse } from 'next/server'; 

const getInterviewLimit = (subscription: string) => {
  const plan = pricingPlans.find(plan => plan.name === subscription);
  return plan ? plan.dailyLimit : 2;
};

export const GET = async (req: Request) => {
  try {
    await connectToDb();

    const users = await NewUser.find();

    const updatePromises = users.map(user => {
      const interviewLimit = getInterviewLimit(user.subscription);
      user.interviewLimit = interviewLimit; 
      return user.save(); 
    });

    await Promise.all(updatePromises);

    console.log('Interview limits reset successfully at midnight.');
    return NextResponse.json({ message: 'Interview limits reset successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error resetting interview limits:', error);
    return NextResponse.json({ message: 'Error resetting interview limits', error: (error as Error).message  }, { status: 500 });
  }
};
