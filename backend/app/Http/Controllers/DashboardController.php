<?php

namespace App\Http\Controllers;

use App\Models\Player;
use App\Models\Member;
use App\Models\MatchFixture;
use App\Models\Contribution;
use App\Models\Expense;
use App\Models\Sponsor;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function index(): JsonResponse
    {
        $totalPlayers = Player::count();
        $activePlayers = Player::where('status', 'Active')->count();

        $totalMembers = Member::count();
        $activeMembers = Member::where('status', '!=', 'Inactive')->count();

        $pledgedIncome = Contribution::sum('amount');
        $receivedIncome = Contribution::sum('paid');
        $sponsorReceived = Sponsor::sum('received');
        $totalReceivedIncome = $receivedIncome + $sponsorReceived;

        $totalExpenses = Expense::sum('amount');
        $balance = $totalReceivedIncome - $totalExpenses;

        $outstandingPledges = Contribution::whereRaw('amount > paid')
            ->selectRaw('SUM(amount - paid) as total')
            ->value('total') ?? 0;

        $recentMatches = MatchFixture::where('status', 'Played')
            ->orderBy('date', 'desc')
            ->limit(5)
            ->get();

        $positions = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward', 'Utility'];
        $playerDistribution = [];
        foreach ($positions as $pos) {
            $playerDistribution[$pos] = Player::where('position', $pos)->count();
        }

        return response()->json([
            'kpis' => [
                'total_players' => $totalPlayers,
                'active_players' => $activePlayers,
                'total_members' => $totalMembers,
                'active_members' => $activeMembers,
                'pledged_income' => $pledgedIncome,
                'received_income' => $receivedIncome,
                'total_income' => $totalReceivedIncome,
                'total_expenses' => $totalExpenses,
                'balance' => $balance,
                'outstanding_pledges' => (float)$outstandingPledges,
            ],
            'recent_matches' => $recentMatches,
            'player_distribution' => $playerDistribution,
        ]);
    }
}
