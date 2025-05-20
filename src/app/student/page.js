"use client"
import React, { use, useEffect, useState } from 'react'
import axios from 'axios';
import AuthService from '@/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import BoardStudent from '@/components/boards/boardStudent';

function Student() {
    return (
        <div >
            <BoardStudent/>
        </div>
    )
}

export default Student