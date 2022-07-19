function BankAccount(name, initialDeposit) {
  this.name = name;
  this.balance = initialDeposit;
  this.history = [];
}

BankAccount.prototype.transact = function(amount) {
  if (amount + this.balance < 0) {
    return false;
  } else {
    this.balance += amount;
    this.history.push(amount);
    return true;
  }
}

function User(userName, password) {
  this.userName = userName;
  this.password = password;
  this.accounts = {};
}


var displayAccounts = function() {
  $(".account-list").removeClass("highlight");
  $("#accounts").empty();
  $(".account-list").removeClass("highlight");

  Object.keys(user.accounts).forEach(function(key) {
    if(account.name === user.accounts[key].name) {
      $("#accounts").append("<li class='account-list highlight'>"+user.accounts[key].name+"</li><br>");
    } else {
      $("#accounts").append("<li class='account-list'>"+user.accounts[key].name+"</li><br>");
    }
  });

  $(".account-list").on("click", function() {
    account = accountDict[$(this).text()];
    $("#current-balance").val(account.balance);
    displayHistory();
    $(".account-list").removeClass("highlight");
    $(this).addClass("highlight");
  });
}

var displayHistory = function() {
  $("#history").empty();
  account.history.forEach(function(transaction) {
    $("#history").append("<li>"+transaction.toString()+"</li>")
  });
}

var userDict = {};
var accountDict = {};
var account;
var user;
$(document).ready(function() {

  $("#register").submit(function(event) {
    event.preventDefault();
    account = new BankAccount($("#register-name").val(), parseInt($("#register-initial").val()));
    $("#current-balance").val(account.balance);
    accountDict[account.name] = account;
    displayAccounts();
    $("#register-name").val("");
    $("#register-initial").val("");
  });
  $("#transact").submit(function(event) {
    event.preventDefault();
    var isPossible = account.transact(parseInt($("#transact-amount").val()));
    if (!isPossible) {
      $("#warning").text("Insufficient Funds!!");
    }
    $("#current-balance").val(account.balance);

    displayHistory();
  });
  
  $("#sign-up-btn").click(function() {
    var username = $("#input-username").val();
    var password = $("#input-password").val();
    var newUser = new User(username, password);
    userDict[username] = newUser;
    user = newUser;
    accountDict = user.accounts;
    $("#welcome").text("Welcome, "+user.userName);
    account = {};
    displayAccounts();
    $("#input-username").val("");
    $("#input-password").val("");
  });

  $("#sign-in-btn").click(function() {
    var username = $("#input-username").val();
    var password = $("#input-password").val();
    Object.keys(userDict).forEach(function(key) {
      if (username === userDict[key].userName && password === userDict[key].password) {
        user = userDict[key];
        accountDict = user.accounts;
        account = {};
        displayAccounts();
        $("#current-balance").val("");
        $("#welcome").text("Welcome, "+user.userName);
        $("#input-username").val("");
        $("#input-password").val("");
      }
    });

  });

});
