export interface CacheEntry<V> {
    expiration: number | null;
    value: V;
  }
  
  /**
   * A generic timed cache, allowing you to store items in memory for quick retrieval.
   */
  export class MemoryCache<V = any> {
    private storage: Map<string, CacheEntry<V>> = new Map();
  
    /**
     * @param cacheLimit Time in milliseconds that the link cache is valid for
     */
    constructor(private cacheLimit: number = null) {}
  
    /**
     * Compares a date against the current time, then checks if that is greater than the
     * the expiration date
     * @param expirationDate time when entry expires
     */
    private isCacheValid(expirationDate: number): boolean {
      if (expirationDate == null) {
        return true;
      }
  
      return new Date().getTime() <= expirationDate;
    }
  
    /**
     * If the entry has been cached, return the value. Otherwise, undefined is
     * returned
     * @param key the cache key of the entry you want to retrieve
     */
    public get(key: string): V | undefined {
      const entry = this.storage.get(key);
  
      if (this.storage.has(key) && this.isCacheValid(entry.expiration)) {
        return entry.value;
      }
  
      this.delete(key);
  
      return undefined;
    }
  
    /**
     * If the entry has been cached, return a CacheEntry instance. Otherwise, `null` is
     * returned
     * @param key the cache key of the entry you want to retrieve
     */
    public has(key: string): boolean {
      if (
        this.storage.has(key) &&
        this.isCacheValid(this.storage.get(key).expiration || null)
      ) {
        return true;
      }
  
      this.delete(key);
  
      return false;
    }
  
    /**
     * Creates a new CacheEntry that will track a value for a timed value
     * @param key the cache key you want to set
     * @param value the value you want to store for the given key
     */
    public set(key: string, value: V): void {
      this.storage.set(key, {
        expiration: this.cacheLimit
          ? new Date().getTime() + this.cacheLimit
          : null,
        value,
      });
    }
  
    /**
     * Removes a CacheEntry from memory
     * @param key the cache key you want to set
     */
    public delete(key: string): void {
      this.storage.delete(key);
    }
  }
  