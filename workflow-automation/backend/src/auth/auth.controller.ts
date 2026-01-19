import { Controller, Post, Get, Body, Query, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import type { Request } from 'express';
import type { User } from 'shared/types';

interface LoginDto {
  code: string;
  redirectUri: string;
}

interface AuthorizeQueryDto {
  redirectUri: string;
  state?: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.loginWithOAuth(body.code, body.redirectUri);
  }

  @Get('authorize')
  getAuthorizationUrl(@Query() query: AuthorizeQueryDto) {
    const state = query.state || crypto.randomUUID();
    const url = this.authService.getOAuthAuthorizationUrl(query.redirectUri, state);
    return { url, state };
  }

  /**
   * Dev-only login endpoint for local development
   */
  @Post('dev-login')
  async devLogin() {
    return this.authService.loginDev();
  }

  /**
   * Check if dev login is available
   */
  @Get('dev-mode')
  getDevMode() {
    return { devMode: this.authService.isDevMode() };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getCurrentUser(@Req() req: Request & { user: User }) {
    const { id, email, firstName, lastName, role } = req.user;
    return { id, email, firstName, lastName, role };
  }
}
