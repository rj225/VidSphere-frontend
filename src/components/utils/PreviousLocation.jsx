class PreviousLocation {
    static store(location) {
      localStorage.setItem("previousLocation", location);
    }
  
    static retrieve() {
      return localStorage.getItem("previousLocation");
    }
  
    static clear() {
      localStorage.removeItem("previousLocation");
    }
  }
  
  export default PreviousLocation;
  