import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { DatabaseOperations } from '@/lib/database';

/**
 * GET /api/auth/user
 * Retrieve current user information
 */
export async function GET(request: NextRequest) {
  try {
    // Get the current session
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Fetch user data from database
    const user = await DatabaseOperations.findUserByEmail(session.user.email);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Return user data (excluding sensitive information)
    const { id, email, name, image, planType, preferences, createdAt } = user;
    
    return NextResponse.json({
      user: {
        id,
        email,
        name,
        image,
        planType,
        preferences,
        createdAt,
      }
    });
    
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/auth/user
 * Update user information
 */
export async function PUT(request: NextRequest) {
  try {
    // Get the current session
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Parse request body
    const updates = await request.json();
    
    // Validate updates (add your validation logic here)
    const allowedFields = ['name', 'preferences'];
    const filteredUpdates = Object.keys(updates)
      .filter(key => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = updates[key];
        return obj;
      }, {} as any);
    
    if (Object.keys(filteredUpdates).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }
    
    // Update user in database
    const updatedUser = await DatabaseOperations.updateUser(
      session.user.id,
      filteredUpdates
    );
    
    // Return updated user data
    const { id, email, name, image, planType, preferences, createdAt } = updatedUser;
    
    return NextResponse.json({
      user: {
        id,
        email,
        name,
        image,
        planType,
        preferences,
        createdAt,
      }
    });
    
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/auth/user
 * Delete user account
 */
export async function DELETE(request: NextRequest) {
  try {
    // Get the current session
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Delete user and all related data
    await DatabaseOperations.deleteUser(session.user.id);
    
    return NextResponse.json({
      message: 'User account deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}