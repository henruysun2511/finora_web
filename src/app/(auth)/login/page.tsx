"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { ArrowRight, Lock, User, Eye, EyeOff } from "lucide-react";

import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/stores/useAuthStore";

const loginSchema = z.object({
  username: z.string().min(3, "Tên đăng nhập phải có ít nhất 3 ký tự"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const res = await authService.login(data);
      const token = res.accessToken || res.tokens?.accessToken;
      const refreshToken = res.refreshToken || res.tokens?.refreshToken;

      if (!token) {
        throw new Error("Không nhận được token xác thực từ máy chủ");
      }

      setAuth(res.user, token, refreshToken);
      toast.success(
        `Chào mừng ${res.user.fullName || res.user.username} trở lại!`
      );
      router.push("/admin/dashboard");
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-card/90 backdrop-blur-xl border border-border/80 rounded-3xl p-8 sm:p-10 shadow-2xl">
      <div className="flex flex-col items-center text-center mb-8">
        <Logo showBadge className="mb-4" />
        <h1 className="text-2xl font-black text-foreground tracking-tight">
          Đăng nhập Quản trị
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
            Tên đăng nhập / Email
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="admin hoặc email..."
              className="pl-11"
              {...register("username")}
            />
          </div>
          {errors.username && (
            <p className="text-xs text-destructive font-medium ml-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between ml-1">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Mật khẩu
            </label>
            <span className="text-xs text-primary font-medium hover:underline cursor-pointer">
              Quên mật khẩu?
            </span>
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="pl-11 pr-11"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive font-medium ml-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-12 rounded-2xl text-base font-bold shadow-lg shadow-primary/25 mt-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="size-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              <span>Đang xác thực...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span>Đăng nhập hệ thống</span>
              <ArrowRight className="size-4" />
            </div>
          )}
        </Button>
      </form>
    </div>
  );
}

