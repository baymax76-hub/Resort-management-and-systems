'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeftRight,
  RotateCcw,
  GitFork,
  Zap,
  Clock,
  PieChart,
  Wallet,
  Cloud,
  Binary,
  TrendingUp,
  CheckCircle2,
  DollarSign,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  RefreshCw,
  SlidersHorizontal,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export function ThorSwapView() {
  const { addToast } = useToast();
  const [fromAmount, setFromAmount] = useState('100');
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('RUNE');
  const [slippage, setSlippage] = useState('0.5%');

  const handleSwap = () => {
    addToast({
      title: 'Swap Broadcasted!',
      message: `Swapped ${fromAmount} ${fromToken} for ~${(parseFloat(fromAmount || 0) * 142.8).toFixed(2)} ${toToken}`,
      type: 'gold'
    });
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-[#0e1626] border border-[#1e2a42] rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-white font-sans">Thor Swap</h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Slippage:</span>
            <button className="bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg text-white font-mono">
              {slippage}
            </button>
          </div>
        </div>

        {/* Input From */}
        <div className="bg-[#141d2e] border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span>You Send</span>
            <span>Balance: 4.82 ETH</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <input
              type="number"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="bg-transparent text-2xl font-bold text-white outline-none w-full font-mono"
              placeholder="0.0"
            />
            <button className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-3.5 py-1.5 rounded-xl flex items-center gap-2 shrink-0 text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
              {fromToken}
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Swap Direction Toggle */}
        <div className="flex justify-center -my-3 relative z-10">
          <button
            onClick={() => {
              const temp = fromToken;
              setFromToken(toToken);
              setToToken(temp);
            }}
            className="w-10 h-10 rounded-full bg-[#182338] hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 border border-slate-700 flex items-center justify-center shadow-lg transition-all"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        {/* Output To */}
        <div className="bg-[#141d2e] border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span>You Receive (Estimated)</span>
            <span>Balance: 14,250 RUNE</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-2xl font-bold text-white font-mono">
              {(parseFloat(fromAmount || 0) * 142.8).toFixed(2)}
            </span>
            <button className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-3.5 py-1.5 rounded-xl flex items-center gap-2 shrink-0 text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              {toToken}
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Route Details */}
        <div className="bg-[#101828] p-3.5 rounded-xl text-xs space-y-2 text-slate-400 border border-slate-800/80">
          <div className="flex justify-between">
            <span>Network Fee:</span>
            <span className="text-white font-mono">0.02 RUNE (~$0.12)</span>
          </div>
          <div className="flex justify-between">
            <span>Minimum Received:</span>
            <span className="text-white font-mono">
              {(parseFloat(fromAmount || 0) * 142.1).toFixed(2)} {toToken}
            </span>
          </div>
        </div>

        <button
          onClick={handleSwap}
          className="w-full py-4 rounded-2xl bg-[#22c55e] hover:bg-[#16a34a] text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
        >
          Confirm Native Swap
        </button>
      </div>
    </div>
  );
}

export function ThorAddLiquidityView() {
  const { addToast } = useToast();
  const [runeAmount, setRuneAmount] = useState('2500');
  const [assetAmount, setAssetAmount] = useState('1.75');

  const handleDeposit = () => {
    addToast({
      title: 'Liquidity Added to Pool!',
      message: 'You have minted 4,120 LP units at 18.4% APY.',
      type: 'gold'
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Active Yield Pool
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            ETH.ETH / RUNE Liquidity Pool
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Deposit dual assets or single-sided liquidity with 100% Impermanent Loss Protection.
          </p>
        </div>
        <div className="text-left sm:text-right shrink-0">
          <span className="text-xs text-slate-400 block">Pool APY</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-[#22c55e] font-mono">+18.4%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Deposit Card */}
        <div className="bg-[#0e1626] border border-[#1e2a42] rounded-3xl p-6 shadow-2xl space-y-5">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-emerald-400" />
            Add Symmetrical Liquidity
          </h3>

          <div className="space-y-4">
            <div className="bg-[#141d2e] border border-slate-800 rounded-2xl p-3.5 space-y-1.5">
              <div className="flex justify-between text-xs text-slate-400">
                <span>RUNE Deposit</span>
                <span>Bal: 14,250</span>
              </div>
              <input
                type="number"
                value={runeAmount}
                onChange={(e) => setRuneAmount(e.target.value)}
                className="bg-transparent text-xl font-bold text-white outline-none w-full font-mono"
              />
            </div>

            <div className="bg-[#141d2e] border border-slate-800 rounded-2xl p-3.5 space-y-1.5">
              <div className="flex justify-between text-xs text-slate-400">
                <span>ETH Deposit</span>
                <span>Bal: 4.82</span>
              </div>
              <input
                type="number"
                value={assetAmount}
                onChange={(e) => setAssetAmount(e.target.value)}
                className="bg-transparent text-xl font-bold text-white outline-none w-full font-mono"
              />
            </div>
          </div>

          <button
            onClick={handleDeposit}
            className="w-full py-3.5 rounded-2xl bg-[#22c55e] hover:bg-[#16a34a] text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
          >
            Add Liquidity (+18.4% APY)
          </button>
        </div>

        {/* Pool Telemetry */}
        <div className="bg-[#0e1626] border border-[#1e2a42] rounded-3xl p-6 shadow-2xl space-y-4">
          <h3 className="text-sm font-bold text-white">Pool Overview & Analytics</h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Total Pool Depth</span>
              <span className="font-bold text-white font-mono">$48,290,400</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Volume (24h)</span>
              <span className="font-bold text-emerald-400 font-mono">$6,140,820</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Total LP Providers</span>
              <span className="font-bold text-white font-mono">1,482 Active</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">IL Protection Status</span>
              <span className="font-bold text-[#22c55e]">100% Covered (100 Days)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ThorWalletView() {
  const { addToast } = useToast();
  const balances = [
    { token: 'RUNE', name: 'THORChain Native', amount: '14,250.00', usd: '$85,500.00', color: 'bg-emerald-400' },
    { token: 'ETH', name: 'Ethereum', amount: '4.825', usd: '$15,440.00', color: 'bg-indigo-400' },
    { token: 'USDC', name: 'USD Coin', amount: '12,500.00', usd: '$12,500.00', color: 'bg-cyan-400' },
    { token: 'AZURE', name: "L'Horizon Resort Loyalty", amount: '50,000.00', usd: '$25,000.00', color: 'bg-amber-400' }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Wallet Header Card */}
      <div className="bg-gradient-to-r from-sky-950/70 to-slate-900 border border-sky-500/30 rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
            <Wallet className="w-3.5 h-3.5" />
            Connected Web3 Vault
          </span>
          <h2 className="text-3xl font-black text-white font-mono mt-1">$138,440.00</h2>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            thor1qz4k9...u8w3a9 • Ledger Hardware Protected
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => addToast({ title: 'Deposit Address Copied', message: 'thor1qz4k9...u8w3a9', type: 'info' })}
            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-md cursor-pointer"
          >
            Deposit
          </button>
          <button
            onClick={() => addToast({ title: 'Send Modal Opened', message: 'Select recipient address', type: 'info' })}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 cursor-pointer"
          >
            Send
          </button>
        </div>
      </div>

      {/* Asset List */}
      <div className="bg-[#0e1626] border border-[#1e2a42] rounded-3xl p-6 shadow-2xl space-y-4">
        <h3 className="text-sm font-bold text-white">Portfolio Asset Holdings</h3>
        <div className="divide-y divide-slate-800">
          {balances.map((b) => (
            <div key={b.token} className="py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${b.color}`} />
                <div>
                  <span className="text-sm font-bold text-white">{b.token}</span>
                  <span className="text-xs text-slate-400 block">{b.name}</span>
                </div>
              </div>
              <div className="text-right font-mono">
                <span className="text-sm font-bold text-white block">{b.amount}</span>
                <span className="text-xs text-slate-400">{b.usd}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ThorStakeView() {
  const { addToast } = useToast();
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-[#0e1626] border border-[#1e2a42] rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-white">Thor Staking Vault</h2>
          </div>
          <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
            14.6% Staking APR
          </span>
        </div>

        <div className="bg-[#141d2e] border border-slate-800 rounded-2xl p-4 space-y-2">
          <span className="text-xs text-slate-400">Total Staked Value</span>
          <div className="text-2xl font-bold font-mono text-white">8,500 RUNE ($51,000.00)</div>
          <div className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Earned Rewards: +124.8 RUNE this epoch</span>
          </div>
        </div>

        <button
          onClick={() => addToast({ title: 'Rewards Claimed!', message: '124.8 RUNE deposited to wallet.', type: 'gold' })}
          className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          Compound & Stake More
        </button>
      </div>
    </div>
  );
}

export function ThorStatsView() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0e1626] border border-[#1e2a42] rounded-2xl p-5 shadow-xl">
          <span className="text-xs text-slate-400">24h Network Volume</span>
          <h3 className="text-2xl font-extrabold text-white font-mono mt-1">$142,890,200</h3>
          <span className="text-xs text-emerald-400">+12.4% vs yesterday</span>
        </div>
        <div className="bg-[#0e1626] border border-[#1e2a42] rounded-2xl p-5 shadow-xl">
          <span className="text-xs text-slate-400">Total Value Locked (TVL)</span>
          <h3 className="text-2xl font-extrabold text-[#22c55e] font-mono mt-1">$492,100,000</h3>
          <span className="text-xs text-slate-400">100% Bonded Capital</span>
        </div>
        <div className="bg-[#0e1626] border border-[#1e2a42] rounded-2xl p-5 shadow-xl">
          <span className="text-xs text-slate-400">Active THORNodes</span>
          <h3 className="text-2xl font-extrabold text-cyan-400 font-mono mt-1">112 / 120</h3>
          <span className="text-xs text-slate-400">Consensus Health: 99.98%</span>
        </div>
      </div>
    </div>
  );
}
