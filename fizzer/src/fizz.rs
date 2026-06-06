pub mod FizzAndBuzz {

    pub fn make_fizz(a: u64, b: u64, s1: &str, s2: &str) -> impl Fn(u64) {
        let c = a * b;
        let fizz = String::from(s1);
        let buzz = String::from(s2);

        let t = move |range: u64| {
            for i in 1..=range {
                if i % c == 0 {
                    println!("{} {}{}", i, fizz, buzz);
                    continue;
                }
                if i % a == 0 {
                    println!("{} {}", i, fizz);
                    continue;
                }
                if i % b == 0 {
                    println!("{} {}", i, buzz);
                    continue;
                }
            }
        };

        return t;
    }
}
