class RecoveryEngine:
    def __init__(self, platform_name):
        self.platform = platform_name
        self.daily_loss_limit = 20.0  # ২০ ডলার লস হলেই সিস্টেম আপনাকে থামিয়ে দেবে
        self.daily_profit_target = 50.0 # ৫০ ডলার লাভ হলে আপনি খেলা বন্ধ করবেন
        self.current_session_result = 0.0

    def analyze_trade(self, amount, result_type):
        """
        result_type: 'win' অথবা 'loss'
        """
        if result_type == 'win':
            self.current_session_result += amount
            print(f"✔️ চমৎকার সোহাগ ভাই! প্রফিট: +${amount}")
        else:
            self.current_session_result -= amount
            print(f"❌ সাবধান! লস: -${amount}")

        # ইমোশন কন্ট্রোল লজিক
        if self.current_session_result <= -self.daily_loss_limit:
            print("\n🛑 কমান্ড: সোহাগ ভাই, আজকের মতো থামুন! লস লিমিট ক্রস করেছে।")
            print("সবাইকে ভুল প্রমাণ করতে হলে আগে নিজের ক্যাপিটাল বাঁচাতে হবে।")
            return "STOP"
            
        if self.current_session_result >= self.daily_profit_target:
            print("\n💰 মিশন সাকসেস! আজকের টার্গেট পূরণ। এখন টাকা উইথড্র করুন।")
            return "WITHDRAW_NOW"

        return "CONTINUE"

# ব্যবহার: 
# iq_trade = RecoveryEngine("IQ Option")
# action = iq_trade.analyze_trade(10, 'loss')
