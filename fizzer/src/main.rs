use fizzer::make_fizz;

fn main() {
    //standard fizz buzz
    let std_fizz_buzz = make_fizz(3, 5, "Fizz", "Buzz");
    std_fizz_buzz(105);

    println!("------------");

    let fizz_buzz2 = make_fizz(5, 7, "Jazz", "Rock");
    fizz_buzz2(105);

    println!("Hello, world!");
}
