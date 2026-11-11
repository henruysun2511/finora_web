
export interface Mascot {
  id: string;
  tierName: string;
  displayName: string;
  minNetWorth: number;
  maxNetWorth: number | null;
  displayOrder: number;
  htmlContent: string;
  systemPrompt: string;
  quotes: string[];
  mascotAssetUrl?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MascotInput {
  tierName: string;
  displayName: string;
  minNetWorth: number;
  maxNetWorth: number | null;
  displayOrder: number;
  htmlContent: string;
  systemPrompt: string;
  quotes: string[];
  mascotAssetUrl?: string;
  isActive: boolean;
}
