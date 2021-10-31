<script lang=ts>
  import { username, user } from '../user';
  let inputBox_username: string;
  let inputBox_password: string;
  
  function login() {
    user.auth(inputBox_username, inputBox_password, (cb) => {
      // @ts-ignore: Property 'err' does not exist on type
      const { err } = cb
      err && alert(err)
    });
  }
  
  function signup() {
    user.create(inputBox_username, inputBox_password, (cb) => {
      // @ts-ignore: Property 'err' does not exist on type
      const { err } = cb
      
      if (err) {
        alert(err);
      } else {
        login();
      }
    });
  }
  
  function signout() {
    user.leave();
    username.set('');
  }
</script>


<div class="form-wrap">
  <h4>
    login
  </h4>
  
  <label for="username">Username</label>
  <input name="username" bind:value={inputBox_username} minlength="3" maxlength="16" />
  
  <label for="password">Password</label>
  <input name="password" bind:value={inputBox_password} type="password" />
  
  <button class="login" on:click={login}>Login</button>
  <button class="login"  on:click={signup}>Sign Up</button>
  
  <hr>
  
  {#if $username}
    <div class="user-bio">
      current user's username: 
      <strong>
        {$username}
      </strong>
    </div>

    <button class="signout-button" on:click={signout}>
      Sign Out
    </button>
  {:else}
    user not logged (or just !$username)
  {/if}
</div>


<style lang=scss>
  
  .form-wrap {
    border: 1px solid var(--color);
    padding: 1em;
  }
  
</style>