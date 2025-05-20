"use client"
import React, { use, useEffect, useState } from 'react'
import axios from 'axios';
import AuthService from '@/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import BoardTeacher from '@/components/boards/boardTeacher';

function Teacher() {

    return (
        <div >
            <BoardTeacher/>
        </div>
    )
}

export default Teacher